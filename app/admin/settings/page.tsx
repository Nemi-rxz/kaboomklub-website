import { connection } from "next/server";
import { connectDB } from "@/lib/db";
import { SiteSettingsModel } from "@/lib/models/SiteSettings";
import { requireSession } from "@/lib/session";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage() {
  await connection(); await requireSession(); await connectDB();
  const settings = await SiteSettingsModel.findOne({ key: "main" }).lean();
  const initialValues: Record<string, string> = {};
  if (settings) for (const [key, value] of Object.entries(settings)) if (typeof value === "string") initialValues[key] = value;
  return <div className="p-8 text-white"><div className="mb-8"><p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Configuration</p><h1 className="mt-2 text-3xl font-black uppercase">Site Settings</h1></div><SettingsForm initialValues={initialValues} /></div>;
}