import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongo.config.js';
import dotenv from 'dotenv';
import path from 'path';
import router from './routes/index.js';
import articleRoutes from './routes/article.route.js';  
import categoryRoutes from './routes/category.route.js';
import commentRoutes from './routes/comment.route.js';
import tagRoutes from './routes/tag.route.js';
import userRoutes from './routes/user.route.js';
import errorHandler from './middleware/error-handler.middleware.js';
import authRoutes from './routes/auth.routes.js'; 

const app = express();

dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));

app.use(cookieParser());

app.use("/", router);  
app.use("/api", router);

app.use('/api/auth', authRoutes); 
app.use('/api/articles', articleRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/users', userRoutes);

app.all("/*", (req, res, next) => {
    res.render("404");
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
