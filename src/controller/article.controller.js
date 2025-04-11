import Article from '../model/article.model.js';
import { BaseException } from '../exception/base.exception.js';
import { articleSchema } from '../schema/article.schema.js';

export const createArticle = async (req, res, next) => {
  try {
    await articleSchema.validateAsync(req.body);
    const article = await Article.create(req.body);
    res.status(201).json({
      success: true,
      message: "Maqola muvaffaqiyatli yaratildi",
      data: article,
    });
  } catch (err) {
    next(new BaseException(err.message, 400));
  }
};

export const getArticles = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const articles = await Article.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10));
    res.status(200).json({
      success: true,
      message: "Maqolalar ro'yxati",
      count: articles.length,
      data: articles,
    });
  } catch (error) {
    next(new BaseException(error.message, 500));
  }
};

export const getArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      throw new BaseException(`Maqola ID: ${req.params.id} topilmadi`, 404);
    }
    res.status(200).json({
      success: true,
      message: "Maqola topildi",
      data: article,
    });
  } catch (error) {
    next(error);
  }
};

export const updateArticle = async (req, res, next) => {
  try {
    await articleSchema.validateAsync(req.body);
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!article) {
      throw new BaseException(`Maqola ID: ${req.params.id} topilmadi`, 404);
    }
    res.status(200).json({
      success: true,
      message: "Maqola muvaffaqiyatli yangilandi",
      data: article,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      throw new BaseException(`Maqola ID: ${req.params.id} topilmadi`, 404);
    }
    res.status(200).json({
      success: true,
      message: "Maqola muvaffaqiyatli o'chirildi",
    });
  } catch (error) {
    next(error);
  }
};
export const voteArticle = async (req, res, next) => {
  try {
    const { articleId } = req.body;

    const article = await Article.findById(articleId);
    if (!article) throw new BaseException('Maqola topilmadi', 404);

    article.votes = (article.votes || 0) + 1;
    await article.save();

    res.status(200).json({
      success: true,
      message: 'Ovoz muvaffaqiyatli qoʻshildi',
      data: article,
    });
  } catch (error) {
    next(error);
  }
};
