import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Login with Static & Database Auth
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const JWT_SECRET = process.env.JWT_SECRET || 'gemsmuse_secret_key_2026';

    // 1. Static Credentials Check (shri123 / shri123 or admin / admin123)
    if (
        (username === 'shri123' && password === 'shri123') ||
        (username === 'admin' && password === 'admin123')
    ) {
        const token = jwt.sign(
            { id: 1, username: username, role: 'super_admin' },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        return res.json({ token, username, role: 'super_admin' });
    }

    try {
        // 2. Check if user exists in database
        let [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        let user = rows[0];

        // 3. Verify credentials against DB
        if (user && await bcrypt.compare(password, user.password_hash)) {
            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                JWT_SECRET,
                { expiresIn: '24h' }
            );
            return res.json({ token, username: user.username, role: user.role });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login database error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Create New User (Protected - Admin only)
router.post('/register', authenticateToken, async (req, res) => {
    // Restrict creation to super_admin Only
    if (req.user.role !== 'super_admin') {
        return res.status(403).json({ message: 'Access denied: Only Super Admin can create users' });
    }

    const { username, password, email } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Check if username already exists
        const [existing] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // Default role is 'admin'. Only super_admin can maybe create other super_admins (future scope, defaulting to admin for now)
        await pool.query(
            'INSERT INTO users (username, password_hash, email, role) VALUES (?, ?, ?, ?)',
            [username, hashedPassword, email || null, 'admin']
        );
        res.json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Users (Protected)
router.get('/users', authenticateToken, async (req, res) => {
    try {
        const [users] = await pool.query('SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete User (Super Admin Only)
router.delete('/users/:id', authenticateToken, async (req, res) => {
    // Check permissions
    if (req.user.role !== 'super_admin') {
        return res.status(403).json({ message: 'Access denied: Only Super Admin can delete users' });
    }

    const { id } = req.params;

    // Prevent deleting self
    if (parseInt(id) === req.user.id) {
        return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    try {
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update User (Super Admin Only)
router.put('/users/:id', authenticateToken, async (req, res) => {
    // Check permissions
    if (req.user.role !== 'super_admin') {
        return res.status(403).json({ message: 'Access denied: Only Super Admin can update users' });
    }

    const { id } = req.params;
    const { username, email, password, role } = req.body;

    try {
        // Build update query dynamically
        let query = 'UPDATE users SET username = ?, email = ?';
        let params = [username, email];

        if (password && password.trim() !== '') {
            const hashedPassword = await bcrypt.hash(password, 10);
            query += ', password_hash = ?';
            params.push(hashedPassword);
        }

        // Only allow updating role if provided and valid
        if (role && ['admin', 'super_admin'].includes(role)) {
            query += ', role = ?';
            params.push(role);
        }

        query += ' WHERE id = ?';
        params.push(id);

        await pool.query(query, params);

        // Return updated user data (excluding password)
        const [rows] = await pool.query('SELECT id, username, email, role, created_at FROM users WHERE id = ?', [id]);
        res.json({ message: 'User updated successfully', user: rows[0] });
    } catch (error) {
        // Handle duplicate entry error
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        res.status(500).json({ error: error.message });
    }
});

// Forgot Password (Placeholder)
router.post('/forgot-password', async (req, res) => {
    // Logic to send email reset link would go here
    res.json({ message: 'Password reset link sent (simulated).' });
});

export default router;
