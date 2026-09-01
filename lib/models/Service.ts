import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
  slug: string;
  title: string;
  description: string;
  audience: string;
  deliverables: string[];
  ctaLabel: string;
  ctaHref: string;
  order: number;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    audience: { type: String, default: "" },
    deliverables: [{ type: String }],
    ctaLabel: { type: String, default: "Get A Quote" },
    ctaHref: { type: String, default: "/contact" },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ["PUBLISHED", "DRAFT", "ARCHIVED"], default: "DRAFT" },
  },
  { timestamps: true }
);

export const ServiceModel: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
