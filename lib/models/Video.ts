import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVideo extends Document {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  platform: "YouTube" | "Instagram" | "TikTok" | "Other";
  videoUrl: string;
  embedUrl: string;
  category: string;
  relatedArtist?: string;
  featured: boolean;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema = new Schema<IVideo>(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    thumbnail: { type: String, default: "/kaboom-logo.jpg" },
    platform: { type: String, enum: ["YouTube", "Instagram", "TikTok", "Other"], default: "YouTube" },
    videoUrl: { type: String, default: "" },
    embedUrl: { type: String, default: "" },
    category: { type: String, default: "FEATURES" },
    relatedArtist: { type: String },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["PUBLISHED", "DRAFT", "ARCHIVED"], default: "DRAFT" },
  },
  { timestamps: true }
);

export const VideoModel: Model<IVideo> =
  mongoose.models.Video || mongoose.model<IVideo>("Video", VideoSchema);
