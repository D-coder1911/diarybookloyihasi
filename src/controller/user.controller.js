import User from '../models/user.model.js';
    import jwt from 'jsonwebtoken';
    import bcrypt from 'bcryptjs';
    import config from '../config/app.config.js';
    import sendEmail from '../utils/sendEmail.js';

    const register = async (req, res, next) => {
        try {
            const { username, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ username, email, password: hashedPassword });

            await sendEmail(email, 'Diarybook-ga xush kelibsiz!', 'Ro\'yxatdan o\'tganingiz uchun rahmat!');

            res.status(201).json({ message: 'Foydalanuvchi muvaffaqiyatli ro\'yxatdan o\'tdi' });
        } catch (error) {
            next(error);
        }
    };

    const login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: 'Noto\'g\'ri login yoki parol' });
            }

            const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: config.jwtExpiration });

            res.cookie('token', token, {
                httpOnly: true,
                maxAge: config.cookieExpiration,
            });

            res.json({ message: 'Tizimga muvaffaqiyatli kirdingiz' });
        } catch (error) {
            next(error);
        }
    };

    const logout = (req, res) => {
        res.clearCookie('token');
        res.json({ message: 'Tizimdan chiqdingiz' });
    };

    export default { register, login, logout };