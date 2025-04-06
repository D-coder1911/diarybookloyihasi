import Article from '../models/article.model.js';

    const createArticle = async (req, res, next) => {
        try {
            const article = await Article.create(req.body);
            res.status(201).json(article);
        } catch (error) {
            next(error);
        }
    };

    const getArticles = async (req, res, next) => {
        try {
            const articles = await Article.find();
            res.json(articles);
        } catch (error) {
            next(error);
        }
    };

    const getArticle = async (req, res, next) => {
        try {
            const article = await Article.findById(req.params.id);
            if (!article) {
                return res.status(404).json({ message: 'Maqola topilmadi' });
            }
            res.json(article);
        } catch (error) {
            next(error);
        }
    };

    const updateArticle = async (req, res, next) => {
        try {
            const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!article) {
                return res.status(404).json({ message: 'Maqola topilmadi' });
            }
            res.json(article);
        } catch (error) {
            next(error);
        }
    };

    const deleteArticle = async (req, res, next) => {
        try {
            const article = await Article.findByIdAndDelete(req.params.id);
            if (!article) {
                return res.status(404).json({ message: 'Maqola topilmadi' });
            }
            res.json({ message: 'Maqola o\'chirildi' });
        } catch (error) {
            next(error);
        }
    };

    export default { createArticle, getArticles, getArticle, updateArticle, deleteArticle };