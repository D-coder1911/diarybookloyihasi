import { config } from 'dotenv';
config();

export default {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  jwtResetSecret: process.env.RESET_PASSWORD_SECRET,
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASS,
};
