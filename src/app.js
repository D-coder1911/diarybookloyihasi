import path from "node:path";
import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import ErrorHandlerMiddleware from "./middleware/error-handler.middleware.js";
import methodOverride from "method-override";
import morgan from "morgan";

const app = express();

app.use(methodOverride("_method"));

if (process.env.NODE_ENV?.trim() === "development") {
  app.use(morgan("tiny"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));

app.use(cookieParser());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/", router);

app.use((req, res) => {
  res.status(404).render("404", { url: req.originalUrl });
});

app.use(ErrorHandlerMiddleware);

export default app;
