import { config } from "dotenv";
import transporter from "../config/mail.config.js";
import { BaseException } from "../exception/base.exception.js";

config();

export const sendMail = async ({ to, subject, text = "", html = "" }) => {
  try {
    if (!to || !subject) {
      throw new BaseException("Email manzili va mavzu majburiy", 400);
    }

    const mail = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject,
      text,
      html,
    });

    return { success: true, messageId: mail.messageId };
  } catch (err) {
    console.error(`Email yuborishda xatolik: ${err.message}`);
    throw new BaseException("Email yuborishda xatolik", 500);
  }
};
