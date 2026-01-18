import express from 'express';
import pool from '../db.js';
import authenticateToken from '../middleware/authMiddleware.js';
import upload from '../upload.js';

const router = express.Router();

// Get All Products (with filters optionally)
router.get('/', async (req, res) => {
    try {
        const { collection_id } = req.query;
        let query = `
      SELECT p.*, c.name as collection_name, 
      (SELECT url FROM product_media pm WHERE pm.product_id = p.id AND pm.media_type = 'image' LIMIT 1) as main_image
      FROM products p
      LEFT JOIN collections c ON p.collection_id = c.id
    `;
        const params = [];

        if (collection_id) {
            query += ' WHERE p.collection_id = ?';
            params.push(collection_id);
        }

        query += ' ORDER BY p.created_at DESC';

        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Single Product
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [productRows] = await pool.query(`
            SELECT p.*, c.name as collection_name
            FROM products p
            LEFT JOIN collections c ON p.collection_id = c.id
            WHERE p.id = ?
        `, [id]);
        if (productRows.length === 0) return res.status(404).json({ message: 'Product not found' });

        const [mediaRows] = await pool.query('SELECT * FROM product_media WHERE product_id = ?', [id]);

        res.json({ ...productRows[0], media: mediaRows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create Product with Media
router.post('/', authenticateToken, upload.array('media', 20), async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const {
            collection_id, sku, name, product_type, set_name,
            metal_type, metal_purity, metal_color, metal_weight,
            gem_stones, gem_stones_weight, center_stone_weight,
            total_stone_weight, total_diamond_weight, size, description
        } = req.body;

        const [productResult] = await connection.query(`
      INSERT INTO products (
        collection_id, sku, name, product_type, set_name,
        metal_type, metal_purity, metal_color, metal_weight,
        gem_stones, gem_stones_weight, center_stone_weight,
        total_stone_weight, total_diamond_weight, size, description
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
            collection_id || null, sku, name, product_type, set_name,
            metal_type, metal_purity, metal_color, metal_weight || 0,
            gem_stones, gem_stones_weight || 0, center_stone_weight || 0,
            total_stone_weight || 0, total_diamond_weight || 0, size, description
        ]);

        const productId = productResult.insertId;

        if (req.files && req.files.length > 0) {
            const mediaValues = req.files.map(file => {
                const type = file.mimetype.startsWith('video') ? 'video' : 'image';
                return [productId, file.path.replace(/\\/g, '/'), type];
            });

            await connection.query(
                'INSERT INTO product_media (product_id, url, media_type) VALUES ?',
                [mediaValues]
            );
        }

        await connection.commit();
        res.status(201).json({ message: 'Product created successfully', id: productId });

    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
});

// Update Product
router.put('/:id', authenticateToken, upload.array('media', 20), async (req, res) => {
    const { id } = req.params;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const {
            collection_id, sku, name, product_type, set_name,
            metal_type, metal_purity, metal_color, metal_weight,
            gem_stones, gem_stones_weight, center_stone_weight,
            total_stone_weight, total_diamond_weight, size, description
        } = req.body;

        await connection.query(`
            UPDATE products SET 
                collection_id = ?, sku = ?, name = ?, product_type = ?, set_name = ?,
                metal_type = ?, metal_purity = ?, metal_color = ?, metal_weight = ?,
                gem_stones = ?, gem_stones_weight = ?, center_stone_weight = ?,
                total_stone_weight = ?, total_diamond_weight = ?, size = ?, description = ?
            WHERE id = ?
        `, [
            collection_id || null, sku, name, product_type, set_name,
            metal_type, metal_purity, metal_color, metal_weight || 0,
            gem_stones, gem_stones_weight || 0, center_stone_weight || 0,
            total_stone_weight || 0, total_diamond_weight || 0, size, description,
            id
        ]);

        if (req.files && req.files.length > 0) {
            const mediaValues = req.files.map(file => {
                const type = file.mimetype.startsWith('video') ? 'video' : 'image';
                return [id, file.path.replace(/\\/g, '/'), type];
            });

            await connection.query(
                'INSERT INTO product_media (product_id, url, media_type) VALUES ?',
                [mediaValues]
            );
        }

        await connection.commit();
        res.json({ message: 'Product updated successfully' });

    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
});

// Delete Product
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM products WHERE id = ?', [id]);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
