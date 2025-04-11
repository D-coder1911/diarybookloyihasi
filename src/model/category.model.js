import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Kategoriya nomi talab qilinadi'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    articles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Category', categorySchema);
