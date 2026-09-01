import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEvent extends Document {
  slug: string;
  name: string;
  date: string;
  location: string;
  description: string;
  artists: string[];
  organizer: string;
  href: string;
  image: string;
  featured: boolean;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    date: { type: String, default: "" },
    location: { type: String, default: "" },
    description: { type: String, default: "" },
    artists: [{ type: String }],
    organizer: { type: String, default: "KaboomKlub" },
    href: { type: String, default: "" },
    image: { type: String, default: "/kaboom-logo.jpg" },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["PUBLISHED", "DRAFT", "ARCHIVED"], default: "DRAFT" },
  },
  { timestamps: true }
);

export const EventModel: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
