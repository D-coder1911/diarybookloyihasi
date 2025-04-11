import app from "./app.js";
import { APP_PORT } from "./config/app.config.js";
import connectDB from "./config/mongo.config.js";

(async () => {
  try {
    await connectDB();

    const server = app.listen(APP_PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${APP_PORT}`);
    });

    process.on("unhandledRejection", (reason, promise) => {
      console.error("💥 Unhandled Rejection:", reason);
      server.close(() => {
        process.exit(1);
      });
    });

    process.on("uncaughtException", (err) => {
      console.error("💥 Uncaught Exception:", err);
      server.close(() => {
        process.exit(1);
      });
    });

    process.on("SIGTERM", () => {
      console.log("👋 SIGTERM received. Shutting down gracefully...");
      server.close(() => {
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
})();
