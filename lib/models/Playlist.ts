import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPlaylist extends Document {
  slug: string;
  title: string;
  description: string;
  platform: string;
  href: string;
  image: string;
  cadence: string;
  featured: boolean;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  createdAt: Date;
  updatedAt: Date;
}

const PlaylistSchema = new Schema<IPlaylist>(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    platform: { type: String, default: "Spotify" },
    href: { type: String, default: "" },
    image: { type: String, default: "" },
    cadence: { type: String, default: "Updated Regularly" },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["PUBLISHED", "DRAFT", "ARCHIVED"], default: "DRAFT" },
  },
  { timestamps: true }
);

export const PlaylistModel: Model<IPlaylist> =
  mongoose.models.Playlist ||
  mongoose.model<IPlaylist>("Playlist", PlaylistSchema);
