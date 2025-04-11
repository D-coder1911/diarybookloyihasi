import Article from '../model/article.model.js';
import { BaseException } from '../exception/base.exception.js';

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

export const downvoteArticle = async (req, res, next) => {
  try {
    const { articleId } = req.body;

    const article = await Article.findById(articleId);
    if (!article) throw new BaseException('Maqola topilmadi', 404);

    article.votes = (article.votes || 0) - 1;
    await article.save();

    res.status(200).json({
      success: true,
      message: 'Ovoz muvaffaqiyatli olib tashlandi',
      data: article,
    });
  } catch (error) {
    next(error);
  }
};
