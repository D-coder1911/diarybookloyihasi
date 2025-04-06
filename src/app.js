import express from 'express';
    import cookieParser from 'cookie-parser';
    import connectDB from './config/mongo.config.js';
    import articleRoutes from './routes/article.routes.js';
    import categoryRoutes from './routes/category.routes.js';
    import commentRoutes from './routes/comment.routes.js';
    import tagRoutes from './routes/tag.routes.js';
    import userRoutes from './routes/user.routes.js';
    import errorHandler from './middleware/error-handler.middleware.js';

    const app = express();

    connectDB();

    app.use(express.json());
    app.use(cookieParser());

    app.use('/api/articles', articleRoutes);
    app.use('/api/categories', categoryRoutes);
    app.use('/api/comments', commentRoutes);
    app.use('/api/tags', tagRoutes);
    app.use('/api/users', userRoutes);

    app.use(errorHandler);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));