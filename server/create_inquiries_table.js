import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const createInquiriesTable = async () => {
    const { default: pool } = await import('./db.js');

    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50),
        items JSON,
        status ENUM('new', 'contacted', 'closed') DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

    try {
        await pool.query(createTableQuery);
        console.log('Inquiries table created successfully or already exists.');
    } catch (error) {
        console.error('Error creating inquiries table:', error);
    } finally {
        process.exit();
    }
};

createInquiriesTable();
