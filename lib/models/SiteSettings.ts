import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteSettings extends Document {
  key: string;   // singleton key, always "main"
  // Brand
  siteName: string;
  tagline: string;
  shortDescription: string;
  logoUrl: string;
  faviconUrl: string;
  // Contact
  primaryEmail: string;
  contactEmail: string;
  phone: string;
  whatsapp: string;
  // Social
  instagram: string;
  tiktok: string;
  twitter: string;
  youtube: string;
  spotify: string;
  facebook: string;
  // SEO
  siteUrl: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  defaultSocialImage: string;
  // Newsletter
  newsletterName: string;
  newsletterDescription: string;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    key: { type: String, default: "main", unique: true },
    siteName: { type: String, default: "KaboomKlub" },
    tagline: { type: String, default: "African Music, Culture, Business & Entertainment" },
    shortDescription: { type: String, default: "Discover the music, people, ideas and stories shaping Africa's culture and creative economy." },
    logoUrl: { type: String, default: "/kaboom-logo.jpg" },
    faviconUrl: { type: String, default: "/favicon.ico" },
    primaryEmail: { type: String, default: "" },
    contactEmail: { type: String, default: "" },
    phone: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    instagram: { type: String, default: "https://www.instagram.com/kaboomklub/" },
    tiktok: { type: String, default: "https://www.tiktok.com/@kaboomklub" },
    twitter: { type: String, default: "https://x.com/kaboomklub" },
    youtube: { type: String, default: "https://www.youtube.com/@kaboomklub" },
    spotify: { type: String, default: "https://open.spotify.com/" },
    facebook: { type: String, default: "" },
    siteUrl: { type: String, default: "https://kaboomklub.com" },
    defaultSeoTitle: { type: String, default: "KaboomKlub — African Music, Culture, Business & Entertainment" },
    defaultSeoDescription: { type: String, default: "Discover the music, people, ideas and stories shaping Africa's culture and creative economy." },
    defaultSocialImage: { type: String, default: "/kaboom-logo.jpg" },
    newsletterName: { type: String, default: "The Kaboomklub Brief" },
    newsletterDescription: { type: String, default: "The week in African music, culture, business and entertainment — delivered to your inbox." },
  },
  { timestamps: true }
);

export const SiteSettingsModel: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
