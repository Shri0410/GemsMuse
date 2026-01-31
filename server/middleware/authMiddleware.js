import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : null;

    if (!token) {
        return res.status(401).json({ message: 'Access token missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('[AuthMiddleware] JWT Verification Failed:', err.message);

            return res.status(401).json({
                message: err.name === 'TokenExpiredError'
                    ? 'Token expired'
                    : 'Invalid token',
            });
        }

        req.user = user;
        next();
    });
};

export default authenticateToken;
