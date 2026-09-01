import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISubscriber extends Document {
  email: string;
  firstName: string;
  status: "ACTIVE" | "UNSUBSCRIBED";
  unsubscribeToken: string;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriberSchema = new Schema<ISubscriber>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    firstName: { type: String, default: "" },
    status: { type: String, enum: ["ACTIVE", "UNSUBSCRIBED"], default: "ACTIVE" },
    unsubscribeToken: { type: String, required: true },
  },
  { timestamps: true }
);

export const SubscriberModel: Model<ISubscriber> =
  mongoose.models.Subscriber ||
  mongoose.model<ISubscriber>("Subscriber", SubscriberSchema);
