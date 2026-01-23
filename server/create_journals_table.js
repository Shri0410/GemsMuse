import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const createJournalsTable = async () => {
    const { default: pool } = await import('./db.js');

    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS journals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        excerpt TEXT,
        author VARCHAR(255),
        category VARCHAR(100),
        read_time VARCHAR(50),
        image_url VARCHAR(255),
        content JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

    try {
        await pool.query(createTableQuery);
        console.log('Journals table created successfully or already exists.');
    } catch (error) {
        console.error('Error creating journals table:', error);
    } finally {
        process.exit();
    }
};

createJournalsTable();
