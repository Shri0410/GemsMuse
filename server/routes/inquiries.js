import express from 'express';
import pool from '../db.js';
import emailService from '../utils/email.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Create new inquiry (Public / Customer)
router.post('/', async (req, res) => {
    const { customer_name, customer_email, customer_phone, items } = req.body;

    // Validate input
    if (!customer_name || !customer_email || !items || items.length === 0) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Save to Database
        const itemsJson = JSON.stringify(items);
        const [result] = await pool.query(`
            INSERT INTO inquiries (customer_name, customer_email, customer_phone, items)
            VALUES (?, ?, ?, ?)
        `, [customer_name, customer_email, customer_phone || null, itemsJson]);

        // Send Email Notification
        await emailService.sendInquiryEmail({
            customer_name,
            customer_email,
            customer_phone,
            items
        });

        res.status(201).json({ message: 'Inquiry submitted successfully', id: result.insertId });

    } catch (error) {
        console.error('Error submitting inquiry:', error);
        res.status(500).json({ error: 'Failed to submit inquiry' });
    }
});

// Get all inquiries (Admin only)
router.get('/', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM inquiries ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching inquiries:', error);
        res.status(500).json({ error: 'Failed to fetch inquiries' });
    }
});

// Delete inquiry (Admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM inquiries WHERE id = ?', [id]);
        res.json({ message: 'Inquiry deleted successfully' });
    } catch (error) {
        console.error('Error deleting inquiry:', error);
        res.status(500).json({ error: 'Failed to delete inquiry' });
    }
});

export default router;
