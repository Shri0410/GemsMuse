import express from 'express';
import pool from '../db.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Get All Attributes
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM product_attributes ORDER BY attribute_type, value');
        // Group by attribute_type for easier frontend consumption
        const grouped = rows.reduce((acc, curr) => {
            if (!acc[curr.attribute_type]) acc[curr.attribute_type] = [];
            acc[curr.attribute_type].push(curr);
            return acc;
        }, { metal_type: [], metal_purity: [], metal_color: [] });
        res.json(grouped);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add Attribute
router.post('/', authenticateToken, async (req, res) => {
    const { attribute_type, value } = req.body;
    try {
        if (!['metal_type', 'metal_purity', 'metal_color'].includes(attribute_type)) {
            return res.status(400).json({ error: 'Invalid attribute type' });
        }
        if (!value) {
            return res.status(400).json({ error: 'Value is required' });
        }

        const [result] = await pool.query(
            'INSERT INTO product_attributes (attribute_type, value) VALUES (?, ?)',
            [attribute_type, value]
        );
        res.status(201).json({ id: result.insertId, attribute_type, value });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Attribute already exists' });
        }
        res.status(500).json({ error: error.message });
    }
});

// Delete Attribute
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM product_attributes WHERE id = ?', [id]);
        res.json({ message: 'Attribute deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
