import express from 'express';
import pool from '../db.js';
import authenticateToken from '../middleware/authMiddleware.js';
import upload from '../upload.js';

const router = express.Router();

// Get All Journals
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM journals ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Single Journal
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM journals WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Journal not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create Journal
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        const { title, excerpt, author, category, read_time, content } = req.body;
        const image_url = req.file ? req.file.path.replace(/\\/g, '/') : null;

        // Ensure content is stringified if it's an object/array, though usually passed as string from frontend or handled by driver
        // If content is sent as a JSON string from frontend, use it. If it's parsed by express.json(), stringify it.
        const contentJson = typeof content === 'object' ? JSON.stringify(content) : content;

        const [result] = await pool.query(`
            INSERT INTO journals (title, excerpt, author, category, read_time, image_url, content)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [title, excerpt, author, category, read_time, image_url, contentJson]);

        res.status(201).json({ message: 'Journal created successfully', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Journal
router.put('/:id', authenticateToken, upload.single('image'), async (req, res) => {
    const { id } = req.params;
    try {
        const { title, excerpt, author, category, read_time, content } = req.body;

        let query = `
            UPDATE journals SET 
            title = ?, excerpt = ?, author = ?, category = ?, read_time = ?, content = ?
        `;
        const params = [title, excerpt, author, category, read_time, typeof content === 'object' ? JSON.stringify(content) : content];

        if (req.file) {
            query += `, image_url = ?`;
            params.push(req.file.path.replace(/\\/g, '/'));
        }

        query += ` WHERE id = ?`;
        params.push(id);

        await pool.query(query, params);

        res.json({ message: 'Journal updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Journal
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM journals WHERE id = ?', [id]);
        res.json({ message: 'Journal deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
