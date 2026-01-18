import express from 'express';
import pool from '../db.js';
import authenticateToken from '../middleware/authMiddleware.js';
import upload from '../upload.js';

const router = express.Router();

// Get All Collections
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM collections ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Single Collection
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM collections WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Collection not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create Collection
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
    const { name, subtitle, description } = req.body;
    const imageUrl = req.file ? req.file.path.replace(/\\/g, '/') : null;

    try {
        const [result] = await pool.query(
            'INSERT INTO collections (name, subtitle, description, image_url) VALUES (?, ?, ?, ?)',
            [name, subtitle, description, imageUrl]
        );
        res.status(201).json({ id: result.insertId, name, subtitle, description, image_url: imageUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Collection
// Update Collection Details
router.put('/:id', authenticateToken, upload.single('image'), async (req, res) => {
    const { name, subtitle, description, is_featured } = req.body;
    const { id } = req.params;
    let imageUrl = req.file ? req.file.path.replace(/\\/g, '/') : undefined;

    try {
        let query = 'UPDATE collections SET name = ?, subtitle = ?, description = ?';
        let params = [name, subtitle, description];

        if (imageUrl) {
            query += ', image_url = ?';
            params.push(imageUrl);
        }

        if (is_featured !== undefined) {
            query += ', is_featured = ?';
            params.push(is_featured === 'true' || is_featured === true ? 1 : 0);
        }

        query += ' WHERE id = ?';
        params.push(id);

        await pool.query(query, params);
        res.json({ message: 'Collection updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Toggle Featured Status
router.patch('/:id/feature', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { is_featured } = req.body; // Expect boolean or 0/1

    try {
        await pool.query('UPDATE collections SET is_featured = ? WHERE id = ?', [is_featured, id]);
        res.json({ message: 'Collection featured status updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Collection
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM collections WHERE id = ?', [id]);
        res.json({ message: 'Collection deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
