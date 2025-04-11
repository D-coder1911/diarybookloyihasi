import User from '../model/user.model.js';
import { BaseException } from '../exception/base.exception.js';

export const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10));
    res.status(200).json({
      success: true,
      message: 'Foydalanuvchilar roʻyxati',
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(new BaseException(error.message, 500));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new BaseException(`Foydalanuvchi ID: ${req.params.id} topilmadi`, 404);
    }
    res.status(200).json({
      success: true,
      message: 'Foydalanuvchi topildi',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      throw new BaseException(`Foydalanuvchi ID: ${req.params.id} topilmadi`, 404);
    }
    res.status(200).json({
      success: true,
      message: 'Foydalanuvchi muvaffaqiyatli yangilandi',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      throw new BaseException(`Foydalanuvchi ID: ${req.params.id} topilmadi`, 404);
    }
    res.status(200).json({
      success: true,
      message: 'Foydalanuvchi muvaffaqiyatli oʻchirildi',
    });
  } catch (error) {
    next(error);
  }
};
