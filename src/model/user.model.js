import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Foydalanuvchi nomi talab qilinadi'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email talab qilinadi'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Parol talab qilinadi'],
    },
    roles: {
      type: [String],
      enum: ['VIEWER', 'SUPER_ADMIN', 'LIBERY_OWNER', 'ADMIN', 'USER'],
      default: ['USER'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
