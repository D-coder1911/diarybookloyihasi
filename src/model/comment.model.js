import mongoose from 'mongoose';

    const commentSchema = new mongoose.Schema({
        text: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
        createdAt: { type: Date, default: Date.now },
    });

    export default mongoose.model('Comment', commentSchema);