import User from '../model/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { BaseException } from '../exception/base.exception.js';
import Joi from 'joi';
import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRE_TIME,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRE_TIME,
} from '../config/jwt.config.js';

// Validatsiya sxemalari
const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Foydalanuvchini ro‘yxatdan o‘tkazish
const registerUser = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) throw new BaseException(error.details[0].message, 400);

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new BaseException('Bu email bilan foydalanuvchi allaqachon roʻyxatdan oʻtgan', 400);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      success: true,
      message: 'Foydalanuvchi muvaffaqiyatli roʻyxatdan oʻtdi',
      data: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

// Foydalanuvchini tizimga kirgizish
const loginUser = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) throw new BaseException(error.details[0].message, 400);

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new BaseException('Email yoki parol notoʻgʻri', 401);

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw new BaseException('Email yoki parol notoʻgʻri', 401);

    const accessToken = jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
      algorithm: "HS256",
    });
    const refreshToken = jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
      algorithm: "HS256",
    });

    res.status(200).json({
      success: true,
      message: 'Tizimga muvaffaqiyatli kirildi',
      data: { accessToken, refreshToken },
    });
  } catch (error) {
    next(error);
  }
};

// Refresh token yangilash
const refreshToken = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) throw new BaseException('Refresh token taqdim etilmagan', 400);

    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign({ id: decoded.id }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
      algorithm: "HS256",
    });

    res.status(200).json({
      success: true,
      message: 'Access token yangilandi',
      data: { accessToken },
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      next(new BaseException('Refresh token muddati tugagan', 401));
    } else {
      next(new BaseException('Refresh token notoʻgʻri', 401));
    }
  }
};

export default {
  registerUser,
  loginUser,
  refreshToken,
};
