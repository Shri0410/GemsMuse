import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

import authRoutes from './routes/auth.js';
import customerAuthRoutes from './routes/customerAuth.js';
import collectionRoutes from './routes/collections.js';
import productRoutes from './routes/products.js';

import attributeRoutes from './routes/attributes.js';

app.use('/api/auth', authRoutes); // Dashboard Admin Auth
app.use('/api/customer-auth', customerAuthRoutes); // Website Customer Auth
app.use('/api/collections', collectionRoutes);
app.use('/api/products', productRoutes);
app.use('/api/attributes', attributeRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('GemsMuse Backend Running');
});

// Database check
app.get('/db-check', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1');
        res.json({ message: 'Database Connected Successfully', result: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database Connection Failed', details: error.message });
    }
});

const startServer = async () => {
    try {
        // Verify Database Connection
        await pool.query('SELECT 1');
        console.log('Database Connected Successfully');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

// Global Error Handlers
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // Keep server running if possible, or exit gracefully
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
