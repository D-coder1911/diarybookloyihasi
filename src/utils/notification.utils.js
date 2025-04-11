import admin from "firebase-admin";
import { config } from "dotenv";
import { BaseException } from "../exception/base.exception.js";

config();

const firebaseConfig = {
  credential: admin.credential.applicationDefault(),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

admin.initializeApp(firebaseConfig);

export const sendNotification = async ({ title, body, tokens }) => {
  try {
    if (!title || !body || !tokens || !Array.isArray(tokens) || tokens.length === 0) {
      throw new BaseException("Notification uchun barcha maydonlar talab qilinadi", 400);
    }

    const message = {
      notification: { title, body },
      tokens,
    };

    const response = await admin.messaging().sendMulticast(message);

    return { success: true, count: response.successCount, failed: response.failureCount };
  } catch (err) {
    console.error(`Notification yuborishda xatolik: ${err.message}`);
    throw new BaseException("Notification yuborishda xatolik", 500);
  }
};
