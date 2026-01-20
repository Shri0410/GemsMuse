import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars explicitly from the same directory as this script
dotenv.config({ path: path.join(__dirname, '.env') });

const createTable = async () => {
    // Dynamic import to ensure env vars are loaded first
    const { default: pool } = await import('./db.js');

    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS product_attributes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        attribute_type ENUM('metal_type', 'metal_purity', 'metal_color') NOT NULL,
        value VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_attribute (attribute_type, value)
      )
    `);
        console.log('Product attributes table created successfully');

        // Seed initial values
        const initialValues = [
            ['metal_type', 'Gold'], ['metal_type', 'Silver'], ['metal_type', 'Platinum'], ['metal_type', 'Stainless Steel'],
            ['metal_purity', '18K'], ['metal_purity', '22K'], ['metal_purity', '24K'], ['metal_purity', '925'],
            ['metal_color', 'Yellow'], ['metal_color', 'White'], ['metal_color', 'Rose']
        ];

        for (const [type, val] of initialValues) {
            try {
                await pool.query('INSERT INTO product_attributes (attribute_type, value) VALUES (?, ?)', [type, val]);
            } catch (e) {
                if (e.code !== 'ER_DUP_ENTRY') console.error(e);
            }
        }
        console.log('Seeded initial attributes');

    } catch (error) {
        console.error('Error creating table:', error);
    } finally {
        process.exit(0);
    }
};

createTable();
