import mongoose, { Schema, Document, Model } from "mongoose";

export interface IArtist extends Document {
  slug: string;
  name: string;
  bio: string;
  genre: string;
  location: string;
  image: string;
  latestRelease?: string;
  socialLinks: {
    instagram?: string;
    spotify?: string;
    youtube?: string;
    twitter?: string;
    tiktok?: string;
  };
  tags: string[];
  featured: boolean;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  createdAt: Date;
  updatedAt: Date;
}

const ArtistSchema = new Schema<IArtist>(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    bio: { type: String, default: "" },
    genre: { type: String, default: "" },
    location: { type: String, default: "" },
    image: { type: String, default: "" },
    latestRelease: { type: String },
    socialLinks: {
      instagram: String,
      spotify: String,
      youtube: String,
      twitter: String,
      tiktok: String,
    },
    tags: [{ type: String }],
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["PUBLISHED", "DRAFT", "ARCHIVED"], default: "DRAFT" },
  },
  { timestamps: true }
);

export const ArtistModel: Model<IArtist> =
  mongoose.models.Artist || mongoose.model<IArtist>("Artist", ArtistSchema);
