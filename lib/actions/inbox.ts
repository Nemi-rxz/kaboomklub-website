"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { SubmissionModel } from "@/lib/models/Submission";
import { InquiryModel } from "@/lib/models/Inquiry";
import { SubscriberModel } from "@/lib/models/Subscriber";
import { requireSession } from "@/lib/session";
import crypto from "crypto";

// ── Submission (public form) ──────────────────────────────────────────────────
const SubmitSchema = z.object({
  submitterName: z.string().min(1, "Name required"),
  email: z.string().email("Valid email required"),
  artistCompany: z.string().default(""),
  type: z.enum(["music", "press", "interview", "event", "news", "collab"]),
  title: z.string().default(""),
  description: z.string().default(""),
  links: z.string().default(""),
});

export type SubmitFormState = { success?: boolean; error?: string; fieldErrors?: Record<string, string[]> } | null;

export async function submitFormAction(_prev: SubmitFormState, formData: FormData): Promise<SubmitFormState> {
  const parsed = SubmitSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { fieldErrors: parsed.error.flatten().fieldErrors };
  await connectDB();
  await SubmissionModel.create(parsed.data);
  return { success: true };
}

// ── Inquiry (public contact form) ────────────────────────────────────────────
const InquirySchema = z.object({
  name: z.string().min(1, "Name required"),
  company: z.string().default(""),
  email: z.string().email("Valid email required"),
  phone: z.string().default(""),
  service: z.string().default(""),
  budget: z.string().default(""),
  timeline: z.string().default(""),
  description: z.string().min(10, "Please describe your project"),
});

export type InquiryFormState = { success?: boolean; error?: string; fieldErrors?: Record<string, string[]> } | null;

export async function contactFormAction(_prev: InquiryFormState, formData: FormData): Promise<InquiryFormState> {
  const parsed = InquirySchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { fieldErrors: parsed.error.flatten().fieldErrors };
  await connectDB();
  await InquiryModel.create(parsed.data);
  return { success: true };
}

// ── Newsletter subscribe (public) ────────────────────────────────────────────
const NewsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().default(""),
});

export type NewsletterFormState = { success?: boolean; error?: string; alreadySubscribed?: boolean; fieldErrors?: Record<string, string[]> } | null;

export async function newsletterSubscribeAction(_prev: NewsletterFormState, formData: FormData): Promise<NewsletterFormState> {
  const parsed = NewsletterSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { fieldErrors: parsed.error.flatten().fieldErrors };
  await connectDB();

  const existing = await SubscriberModel.findOne({ email: parsed.data.email });
  if (existing) {
    if (existing.status === "ACTIVE") return { alreadySubscribed: true };
    // Reactivate
    existing.status = "ACTIVE";
    await existing.save();
    return { success: true };
  }

  const unsubscribeToken = crypto.randomBytes(32).toString("hex");
  await SubscriberModel.create({ ...parsed.data, unsubscribeToken });
  return { success: true };
}

// ── Admin: update submission status ──────────────────────────────────────────
export async function updateSubmissionStatusAction(id: string, status: string): Promise<void> {
  await requireSession();
  await connectDB();
  await SubmissionModel.findByIdAndUpdate(id, { status });
  revalidatePath("/admin/submissions");
}

// ── Admin: update inquiry status ──────────────────────────────────────────────
export async function updateInquiryStatusAction(id: string, status: string): Promise<void> {
  await requireSession();
  await connectDB();
  await InquiryModel.findByIdAndUpdate(id, { status });
  revalidatePath("/admin/inquiries");
}
