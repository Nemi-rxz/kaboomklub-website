import mongoose, { Schema, Document, Model } from "mongoose";

export type PostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type PostPriority = "MAJOR" | "SECONDARY" | "SIDEBAR";
export type PostCategory = "MUSIC" | "ENTERTAINMENT" | "CULTURE" | "BUSINESS" | "FEATURES";
export type ContentFormat =
  | "News" | "Feature" | "Interview" | "Artist Spotlight" | "Review"
  | "Explainer" | "Deep Dive" | "Industry Watch" | "Culture Watch"
  | "The Business of Music" | "Opinion" | "Roundup" | "Profile";

export interface IPost extends Document {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: PostCategory;
  subcategory: string;
  contentFormat?: ContentFormat;
  categoryColor: string;
  author: string;
  authorRole: string;
  date: string;
  updatedDate: string;
  readTime: string;
  image: string;
  imageCaption: string;
  priority: PostPriority;
  featured: boolean;
  tags: string[];
  status: PostStatus;
  seoTitle: string;
  seoDescription: string;
  socialImage: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, default: "" },
    body: [{ type: String }],
    category: {
      type: String,
      required: true,
      enum: ["MUSIC", "ENTERTAINMENT", "CULTURE", "BUSINESS", "FEATURES"],
    },
    subcategory: { type: String, default: "" },
    contentFormat: {
      type: String,
      enum: ["News", "Feature", "Interview", "Artist Spotlight", "Review", "Explainer", "Deep Dive", "Industry Watch", "Culture Watch", "The Business of Music", "Opinion", "Roundup", "Profile"],
    },
    categoryColor: { type: String, default: "#b3241b" },
    author: { type: String, default: "KABOOMKLUB TEAM" },
    authorRole: { type: String, default: "Editorial Desk" },
    date: { type: String, default: "" },
    updatedDate: { type: String, default: "" },
    readTime: { type: String, default: "3 MIN READ" },
    image: { type: String, default: "/kaboom-logo.jpg" },
    imageCaption: { type: String, default: "" },
    priority: { type: String, enum: ["MAJOR", "SECONDARY", "SIDEBAR"], default: "SECONDARY" },
    featured: { type: Boolean, default: false },
    tags: [{ type: String }],
    status: { type: String, enum: ["DRAFT", "PUBLISHED", "ARCHIVED"], default: "DRAFT" },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    socialImage: { type: String, default: "" },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

PostSchema.index({ status: 1, category: 1 });
PostSchema.index({ status: 1, featured: 1 });
PostSchema.index({ tags: 1 });

export const PostModel: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);
