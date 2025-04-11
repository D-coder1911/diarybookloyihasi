import Comment from '../model/comment.model.js';
import { BaseException } from '../exception/base.exception.js';

export const getComments = async (req, res, next) => {
  try {
    const { articleId } = req.query;
    const filter = articleId ? { articleId } : {};
    const comments = await Comment.find(filter);
    res.status(200).json({
      success: true,
      message: 'Izohlar roʻyxati',
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    next(new BaseException(error.message, 500));
  }
};

export const createComment = async (req, res, next) => {
  try {
    const { content, articleId, userId } = req.body;
    if (!content || !articleId || !userId) {
      throw new BaseException('Barcha maydonlar talab qilinadi', 400);
    }
    const newComment = await Comment.create({ content, articleId, userId });
    res.status(201).json({
      success: true,
      message: 'Izoh muvaffaqiyatli yaratildi',
      data: newComment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      throw new BaseException(`Izoh ID: ${req.params.id} topilmadi`, 404);
    }
    res.status(200).json({
      success: true,
      message: 'Izoh muvaffaqiyatli oʻchirildi',
    });
  } catch (error) {
    next(error);
  }
};
