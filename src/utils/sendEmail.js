import nodemailer from 'nodemailer';
    import config from '../config/app.config.js';

    const sendEmail = async (to, subject, text) => {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: config.emailUser,
                    pass: config.emailPassword,
                },
            });

            const mailOptions = {
                from: config.emailUser,
                to,
                subject,
                text,
            };

            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Email yuborishda xatolik:', error);
        }
    };

    export default sendEmail;