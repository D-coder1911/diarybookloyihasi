import { config } from "dotenv";
    import mongoose from "mongoose";

    config();

    const connectDB = async () => {
        try {
            await mongoose.connect(process.env.MONGO_URI);
            console.log("MongoDB ulandi ✅");
        } catch (error) {
            console.log("Database'ga ulanishda xatolik:", error);
            process.exit(1);
        }
    };

    export default connectDB;