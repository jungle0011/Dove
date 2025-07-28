import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  author: string;
  authorEmail?: string;
  tags: string[];
  category: string;
  isPinned: boolean;
  isPublished: boolean;
  views: number;
  likes: number;
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
  featuredImage?: string;
  excerpt?: string;
  readTime?: number;
  imageUrl?: string;
  videoUrl?: string;
}

export interface IComment extends Document {
  content: string;
  author: string;
  authorEmail?: string;
  isAnonymous: boolean;
  createdAt: Date;
  isApproved: boolean;
  parentComment?: mongoose.Types.ObjectId;
  replies: mongoose.Types.ObjectId[];
}

const CommentSchema = new Schema<IComment>({
  content: { type: String, required: true, maxlength: 1000 },
  author: { type: String, required: true, maxlength: 100 },
  authorEmail: { type: String, maxlength: 255 },
  isAnonymous: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  isApproved: { type: Boolean, default: true },
  parentComment: { type: Schema.Types.ObjectId, ref: 'Comment' },
  replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true, maxlength: 200 },
  content: { type: String, required: true },
  author: { type: String, required: true, maxlength: 100 },
  authorEmail: { type: String, maxlength: 255 },
  tags: [{ type: String, maxlength: 50 }],
  category: { type: String, required: true, default: 'General' },
  isPinned: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: [CommentSchema],
  featuredImage: { type: String },
  excerpt: { type: String, maxlength: 300 },
  readTime: { type: Number },
  imageUrl: { type: String },
  videoUrl: { type: String },
}, {
  timestamps: true
});

// Indexes for better performance
PostSchema.index({ title: 'text', content: 'text' });
PostSchema.index({ isPinned: 1, createdAt: -1 });
PostSchema.index({ category: 1, createdAt: -1 });
PostSchema.index({ tags: 1 });

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema); 