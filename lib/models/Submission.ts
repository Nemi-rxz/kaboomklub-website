import mongoose, { Schema, Document, Model } from "mongoose";

export type SubmissionStatus = "NEW" | "REVIEWING" | "APPROVED" | "REJECTED" | "PUBLISHED";
export type SubmissionType =
  | "music" | "press" | "interview" | "event" | "news" | "collab";

export interface ISubmission extends Document {
  submitterName: string;
  email: string;
  artistCompany: string;
  type: SubmissionType;
  title: string;
  description: string;
  links: string;
  status: SubmissionStatus;
  adminNotes: string;
  createdAt: Date;
  updatedAt: Date;
}

const SubmissionSchema = new Schema<ISubmission>(
  {
    submitterName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    artistCompany: { type: String, default: "" },
    type: {
      type: String,
      required: true,
      enum: ["music", "press", "interview", "event", "news", "collab"],
    },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    links: { type: String, default: "" },
    status: {
      type: String,
      enum: ["NEW", "REVIEWING", "APPROVED", "REJECTED", "PUBLISHED"],
      default: "NEW",
    },
    adminNotes: { type: String, default: "" },
  },
  { timestamps: true }
);

export const SubmissionModel: Model<ISubmission> =
  mongoose.models.Submission ||
  mongoose.model<ISubmission>("Submission", SubmissionSchema);
