import { notFound } from "next/navigation";
import { connection } from "next/server";
import { connectDB } from "@/lib/db";
import { SubmissionModel } from "@/lib/models/Submission";
import { requireSession } from "@/lib/session";
import { updateSubmissionStatusAction } from "@/lib/actions/inbox";
import StatusBadge from "@/components/admin/StatusBadge";

const statuses = ["NEW", "REVIEWING", "APPROVED", "REJECTED", "PUBLISHED"] as const;
export default async function SubmissionPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; await connection(); await requireSession(); await connectDB(); const item = await SubmissionModel.findById(id).lean(); if (!item) notFound(); return <div className="p-8 text-white"><div className="mb-8"><p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Editorial Inbox</p><h1 className="mt-2 text-3xl font-black uppercase">Submission</h1></div><div className="max-w-3xl space-y-5 border border-white/10 bg-[#111] p-6"><p className="text-sm text-white/60">{item.submitterName} · {item.email} · {item.type}</p><h2 className="text-2xl font-bold">{item.title || "Untitled submission"}</h2><p className="whitespace-pre-wrap text-sm leading-relaxed text-white/70">{item.description}</p><p className="text-sm text-white/50">{item.links}</p><div className="flex items-center gap-4"><StatusBadge status={item.status} />{statuses.map((status) => <form key={status} action={updateSubmissionStatusAction.bind(null, id, status)}><button className="text-[10px] font-black uppercase tracking-[0.12em] text-[#f2c14e]">{status}</button></form>)}</div></div></div>; }