import { connection } from "next/server";
import { connectDB } from "@/lib/db";
import { SubmissionModel } from "@/lib/models/Submission";
import { requireSession } from "@/lib/session";
import CrudList from "../shared/CrudList";
import { updateSubmissionStatusAction } from "@/lib/actions/inbox";

export default async function SubmissionsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) { const { q } = await searchParams; await connection(); await requireSession(); await connectDB(); const rows = await SubmissionModel.find(q ? { $or: [{ submitterName: { $regex: q, $options: "i" } }, { email: { $regex: q, $options: "i" } }, { title: { $regex: q, $options: "i" } }] } : {}).sort({ createdAt: -1 }).lean(); return <CrudList title="Submissions" eyebrow="Editorial Inbox" createHref="/admin/submissions" editBase="/admin/submissions" showCreate={false} search={q} rows={rows.map((row) => ({ ...row, submitterName: `${row.submitterName} · ${row.email}`, type: row.type, title: row.title || row.description.slice(0, 50), created: row.createdAt.toLocaleDateString() })) as unknown as Record<string, unknown>[]} columns={[{ key: "submitterName", label: "Submitter" }, { key: "type", label: "Type" }, { key: "title", label: "Details" }, { key: "created", label: "Date" }, { key: "status", label: "Status" }]} />; }