import mongoose, { Schema, models, model } from 'mongoose';

const MediaSchema = new Schema({
  url: { type: String, required: true },
  type: { type: String, enum: ['image', 'video'], default: 'image' },
}, { _id: false });

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  media: { type: [MediaSchema], default: [] },
  tags: { type: [String], default: [] },
  pinned: { type: Boolean, default: false },
  type: { type: String },
  author: { type: String },
  authorAvatar: { type: String },
}, {
  timestamps: true
});

const Article = models.Article || model('Article', ArticleSchema);
export default Article; 