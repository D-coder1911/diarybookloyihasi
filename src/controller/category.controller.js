import Category from '../models/category.model.js';

    const createCategory = async (req, res, next) => {
        try {
            const category = await Category.create(req.body);
            res.status(201).json(category);
        } catch (error) {
            next(error);
        }
    };

    const getCategories = async (req, res, next) => {
        try {
            const categories = await Category.find();
            res.json(categories);
        } catch (error) {
            next(error);
        }
    };

    const getCategory = async (req, res, next) => {
        try {
            const category = await Category.findById(req.params.id);
            if (!category) {
                return res.status(404).json({ message: 'Kategoriya topilmadi' });
            }
            res.json(category);
        } catch (error) {
            next(error);
        }
    };

    const updateCategory = async (req, res, next) => {
        try {
            const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!category) {
                return res.status(404).json({ message: 'Kategoriya topilmadi' });
            }
            res.json(category);
        } catch (error) {
            next(error);
        }
    };

    const deleteCategory = async (req, res, next) => {
        try {
            const category = await Category.findByIdAndDelete(req.params.id);
            if (!category) {
                return res.status(404).json({ message: 'Kategoriya topilmadi' });
            }
            res.json({ message: 'Kategoriya o\'chirildi' });
        } catch (error) {
            next(error);
        }
    };

    export default { createCategory, getCategories, getCategory, updateCategory, deleteCategory };