import { model, models, Schema, Document, Types } from 'mongoose';

export interface IComment {
  _id?: Types.ObjectId;
  text: string;
  date: Date;
  user: {
    name: string;
    image: string;
  };
  position: {
    x: number;
    y: number;
  };
}

export interface IChapter {
  _id?: Types.ObjectId;
  name: string;
  text: string;
  comments: IComment[];
}

export interface INovel extends Document {
  title: string;
  author: string;
  cover: string;
  description: string;
  genre: string;
  tags: string[];
  publishedDate: Date;
  views: number;
  likes: number;
  chapters: IChapter[];
}

const CommentSchema = new Schema<IComment>(
  {
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    user: {
      name: { type: String, required: true },
      image: { type: String, default: '' },
    },
    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
  },
  { _id: true } // Each comment gets its own _id
);

const ChapterSchema = new Schema<IChapter>(
  {
    name: { type: String, required: true },
    text: { type: String, required: true },
    comments: { type: [CommentSchema], default: [] },
  },
  { _id: true } // Each chapter gets its own _id
);

const NovelSchema = new Schema<INovel>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    cover: { type: String, default: '' },
    description: { type: String, default: '' },
    genre: { type: String, default: 'General' },
    tags: { type: [String], default: [] },
    publishedDate: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    chapters: { type: [ChapterSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

const Novel = models.Novel || model<INovel>('Novel', NovelSchema);

export { Novel };
