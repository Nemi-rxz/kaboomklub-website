import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdOpportunity extends Document {
  title: string;
  description: string;
  audience: string;
  tags: string[];
  available: boolean;
  ctaLabel: string;
  order: number;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  createdAt: Date;
  updatedAt: Date;
}

const AdOpportunitySchema = new Schema<IAdOpportunity>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    audience: { type: String, default: "" },
    tags: [{ type: String }],
    available: { type: Boolean, default: true },
    ctaLabel: { type: String, default: "Request A Proposal" },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ["PUBLISHED", "DRAFT", "ARCHIVED"], default: "DRAFT" },
  },
  { timestamps: true }
);

export const AdOpportunityModel: Model<IAdOpportunity> =
  mongoose.models.AdOpportunity ||
  mongoose.model<IAdOpportunity>("AdOpportunity", AdOpportunitySchema);
