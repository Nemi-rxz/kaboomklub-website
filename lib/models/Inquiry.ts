import mongoose, { Schema, Document, Model } from "mongoose";

export type InquiryStatus = "NEW" | "IN_PROGRESS" | "CONTACTED" | "COMPLETED" | "ARCHIVED";

export interface IInquiry extends Document {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  description: string;
  status: InquiryStatus;
  adminNotes: string;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, default: "" },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: "" },
    service: { type: String, default: "" },
    budget: { type: String, default: "" },
    timeline: { type: String, default: "" },
    description: { type: String, default: "" },
    status: {
      type: String,
      enum: ["NEW", "IN_PROGRESS", "CONTACTED", "COMPLETED", "ARCHIVED"],
      default: "NEW",
    },
    adminNotes: { type: String, default: "" },
  },
  { timestamps: true }
);

export const InquiryModel: Model<IInquiry> =
  mongoose.models.Inquiry ||
  mongoose.model<IInquiry>("Inquiry", InquirySchema);
