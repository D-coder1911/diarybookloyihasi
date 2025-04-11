import Article from "../model/article.model.js";
import { BaseException } from "../exception/base.exception.js";

export const voteArticle = async (articleId, voteType = "up") => {
  try {
    const article = await Article.findById(articleId);
    if (!article) {
      throw new BaseException(`Maqola ID: ${articleId} topilmadi`, 404);
    }

    if (voteType === "up") {
      article.votes += 1;
    } else if (voteType === "down") {
      article.votes -= 1;
    } else {
      throw new BaseException("Noto‘g‘ri ovoz turi", 400);
    }

    await article.save();

    return { success: true, votes: article.votes };
  } catch (err) {
    console.error(`Ovoz berishda xatolik: ${err.message}`);
    throw new BaseException("Ovoz berishda xatolik", 500);
  }
};
