import Comment from '../model/comment.model.js';

    const createComment = async (req, res, next) => {
        try {
            const comment = await Comment.create(req.body);
            res.status(201).json(comment);
        } catch (error) {
            next(error);
        }
    };

    const getComments = async (req, res, next) => {
        try {
            const comments = await Comment.find();
            res.json(comments);
        } catch (error) {
            next(error);
        }
    };

    const getComment = async (req, res, next) => {
        try {
            const comment = await Comment.findById(req.params.id);
            if (!comment) {
                return res.status(404).json({ message: 'Izoh topilmadi' });
            }
            res.json(comment);
        } catch (error) {
            next(error);
        }
    };

    const updateComment = async (req, res, next) => {
        try {
            const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!comment) {
                return res.status(404).json({ message: 'Izoh topilmadi' });
            }
            res.json(comment);
        } catch (error) {
            next(error);
        }
    };

    const deleteComment = async (req, res, next) => {
        try {
            const comment = await Comment.findByIdAndDelete(req.params.id);
            if (!comment) {
                return res.status(404).json({ message: 'Izoh topilmadi' });
            }
            res.json({ message: 'Izoh o\'chirildi' });
        } catch (error) {
            next(error);
        }
    };

    export default { createComment, getComments, getComment, updateComment, deleteComment };