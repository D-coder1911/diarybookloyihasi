import Tag from '../models/tag.model.js';

    const createTag = async (req, res, next) => {
        try {
            const tag = await Tag.create(req.body);
            res.status(201).json(tag);
        } catch (error) {
            next(error);
        }
    };

    const getTags = async (req, res, next) => {
        try {
            const tags = await Tag.find();
            res.json(tags);
        } catch (error) {
            next(error);
        }
    };

    const getTag = async (req, res, next) => {
        try {
            const tag = await Tag.findById(req.params.id);
            if (!tag) {
                return res.status(404).json({ message: 'Teg topilmadi' });
            }
            res.json(tag);
        } catch (error) {
            next(error);
        }
    };

    const updateTag = async (req, res, next) => {
        try {
            const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!tag) {
                return res.status(404).json({ message: 'Teg topilmadi' });
            }
            res.json(tag);
        } catch (error) {
            next(error);
        }
    };

    const deleteTag = async (req, res, next) => {
        try {
            const tag = await Tag.findByIdAndDelete(req.params.id);
            if (!tag) {
                return res.status(404).json({ message: 'Teg topilmadi' });
            }
            res.json({ message: 'Teg o\'chirildi' });
        } catch (error) {
            next(error);
        }
    };

    export default { createTag, getTags, getTag, updateTag, deleteTag };