import bcrypt from 'bcrypt';
import pool from './db.js';

const createSuperAdmin = async () => {
    const username = 'shri';
    const password = 'Shri123';
    const role = 'super_admin';
    const email = 'shri@gemsmuse.com'; // Default email

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if exists
        const [existing] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

        if (existing.length > 0) {
            // Update
            console.log(`Updating existing user ${username}...`);
            await pool.query('UPDATE users SET password_hash = ?, role = ? WHERE username = ?', [hashedPassword, role, username]);
            console.log('User updated successfully.');
        } else {
            // Create
            console.log(`Creating new user ${username}...`);
            await pool.query('INSERT INTO users (username, password_hash, email, role) VALUES (?, ?, ?, ?)', [username, hashedPassword, email, role]);
            console.log('User created successfully.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit();
    }
};

createSuperAdmin();
