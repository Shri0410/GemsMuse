import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db.js';
import emailUtils from '../utils/email.js';

const router = express.Router();
const CUSTOMER_JWT_SECRET = process.env.CUSTOMER_JWT_SECRET || process.env.JWT_SECRET || 'fallback_secret';
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'waghmareshrinivas99@gmail.com';

// POST /register
router.post('/register', async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if email exists
        const [existing] = await pool.query('SELECT id FROM customers WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new customer (is_approved = FALSE default)
        const [result] = await pool.query(
            'INSERT INTO customers (full_name, email, password_hash) VALUES (?, ?, ?)',
            [fullName, email, hashedPassword]
        );

        // Generate Approval Link
        // Assuming server runs on localhost:5000 or similar. Ideally use process.env.BASE_URL
        const approvalLink = `http://localhost:5000/api/customer-auth/approve/${result.insertId}`;

        // Send Email to Owner
        await emailUtils.sendApprovalEmail(email, approvalLink);

        res.status(201).json({ message: 'Registration successful. Waiting for admin approval.' });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM customers WHERE email = ?', [email]);
        const user = rows[0];

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (!user.is_approved) {
            return res.status(403).json({ message: 'Account pending approval. Please contact support.' });
        }

        // Generate Token
        const token = jwt.sign(
            { id: user.id, email: user.email, type: 'customer' },
            CUSTOMER_JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({ token, user: { id: user.id, fullName: user.full_name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /approve/:id
router.get('/approve/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('UPDATE customers SET is_approved = TRUE WHERE id = ?', [id]);
        res.send(`
            <h1>Account Approved</h1>
            <p>The customer account (ID: ${id}) has been successfully approved.</p>
            <p>They can now log in.</p>
        `);
    } catch (error) {
        res.status(500).send('Error approving account');
    }
});

export default router;
