import jwt from 'jsonwebtoken';
    import config from '../config/app.config.js';

    const authMiddleware = (req, res, next) => {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Avtorizatsiya tokeni topilmadi' });
        }

        try {
            const decoded = jwt.verify(token, config.jwtSecret);
            req.userId = decoded.id;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Noto\'g\'ri token' });
        }
    };

    export default authMiddleware;