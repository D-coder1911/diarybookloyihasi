import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Teg nomi talab qilinadi'],
      unique: true,
      trim: true,
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

export default mongoose.model('Tag', tagSchema);
