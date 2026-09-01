import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMedia extends Document {
  publicId: string;        // Cloudinary public_id
  url: string;             // Cloudinary secure_url
  thumbnailUrl: string;    // Cloudinary thumbnail transform
  originalFilename: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  folder: string;
  tags: string[];
  uploadedBy: string;      // admin email
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema = new Schema<IMedia>(
  {
    publicId: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    thumbnailUrl: { type: String, default: "" },
    originalFilename: { type: String, default: "" },
    format: { type: String, default: "" },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    bytes: { type: Number, default: 0 },
    folder: { type: String, default: "kaboomklub" },
    tags: [{ type: String }],
    uploadedBy: { type: String, default: "" },
  },
  { timestamps: true }
);

export const MediaModel: Model<IMedia> =
  mongoose.models.Media || mongoose.model<IMedia>("Media", MediaSchema);
