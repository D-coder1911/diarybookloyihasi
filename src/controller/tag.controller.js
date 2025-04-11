import Tag from '../model/tag.model.js';
import { BaseException } from '../exception/base.exception.js';

export const getTags = async (req, res, next) => {
  try {
    const tags = await Tag.find();
    res.status(200).json({
      success: true,
      message: 'Teglar roʻyxati',
      count: tags.length,
      data: tags,
    });
  } catch (error) {
    next(new BaseException(error.message, 500));
  }
};

export const createTag = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      throw new BaseException('Teg nomi talab qilinadi', 400);
    }
    const newTag = await Tag.create({ name });
    res.status(201).json({
      success: true,
      message: 'Teg muvaffaqiyatli yaratildi',
      data: newTag,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTag = async (req, res, next) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) {
      throw new BaseException(`Teg ID: ${req.params.id} topilmadi`, 404);
    }
    res.status(200).json({
      success: true,
      message: 'Teg muvaffaqiyatli oʻchirildi',
    });
  } catch (error) {
    next(error);
  }
};
