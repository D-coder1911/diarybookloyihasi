import Article from '../model/article.model.js';
import { BaseException } from '../exception/base.exception.js';

const createArticle = async (req, res, next) => {
    try {
        const article = await Article.create(req.body);
        res.status(201).json({
            message: 'Maqola muvaffaqiyatli yaratildi',
            data: article
        });
    } catch (error) {
        next(error);
    }
};

const getArticles = async (req, res, next) => {
    try {
        const articles = await Article.find();
        res.json({
            message: 'Maqolalar ro\'yxati',
            count: articles.length,
            data: articles
        });
    } catch (error) {
        next(error);
    }
};

const getArticle = async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            throw new BaseException(`Maqola ID: ${req.params.id} topilmadi`, 404);
        }
        res.json({
            message: 'Maqola topildi',
            data: article
        });
    } catch (error) {
        next(error);
    }
};

const updateArticle = async (req, res, next) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!article) {
            throw new BaseException(`Maqola ID: ${req.params.id} topilmadi`, 404);
        }
        res.json({
            message: 'Maqola muvaffaqiyatli yangilandi',
            data: article
        });
    } catch (error) {
        next(error);
    }
};

const deleteArticle = async (req, res, next) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (!article) {
            throw new BaseException(`Maqola ID: ${req.params.id} topilmadi`, 404);
        }
        res.json({
            message: 'Maqola muvaffaqiyatli o\'chirildi'
        });
    } catch (error) {
        next(error);
    }
};

export default { createArticle, getArticles, getArticle, updateArticle, deleteArticle };
