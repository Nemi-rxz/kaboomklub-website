import { notFound } from "next/navigation";
import { connection } from "next/server";
import { connectDB } from "@/lib/db";
import { InquiryModel } from "@/lib/models/Inquiry";
import { requireSession } from "@/lib/session";
import { updateInquiryStatusAction } from "@/lib/actions/inbox";
import StatusBadge from "@/components/admin/StatusBadge";

const statuses = ["NEW", "IN_PROGRESS", "CONTACTED", "COMPLETED", "ARCHIVED"] as const;
export default async function InquiryPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; await connection(); await requireSession(); await connectDB(); const item = await InquiryModel.findById(id).lean(); if (!item) notFound(); return <div className="p-8 text-white"><div className="mb-8"><p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Business Inbox</p><h1 className="mt-2 text-3xl font-black uppercase">Inquiry</h1></div><div className="max-w-3xl space-y-5 border border-white/10 bg-[#111] p-6"><p className="text-sm text-white/60">{item.name} · {item.email}{item.company ? ` · ${item.company}` : ""}</p><p className="text-xs font-black uppercase tracking-[0.15em] text-[#f2c14e]">{item.service || "General inquiry"}</p><p className="whitespace-pre-wrap text-sm leading-relaxed text-white/70">{item.description}</p><p className="text-sm text-white/50">Budget: {item.budget || "Not provided"} · Timeline: {item.timeline || "Not provided"}</p><div className="flex items-center gap-4"><StatusBadge status={item.status} />{statuses.map((status) => <form key={status} action={updateInquiryStatusAction.bind(null, id, status)}><button className="text-[10px] font-black uppercase tracking-[0.12em] text-[#f2c14e]">{status}</button></form>)}</div></div></div>; }