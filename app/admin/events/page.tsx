import { connection } from "next/server";
import { connectDB } from "@/lib/db";
import { EventModel } from "@/lib/models/Event";
import { deleteEventAction } from "@/lib/actions/events";
import { requireSession } from "@/lib/session";
import CrudList from "../shared/CrudList";

export default async function EventsAdminPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  await connection(); await requireSession(); await connectDB();
  const rows = await EventModel.find(q ? { $or: [{ name: { $regex: q, $options: "i" } }, { location: { $regex: q, $options: "i" } }] } : {}).sort({ createdAt: -1 }).lean();
  return <CrudList title="Events" eyebrow="Calendar" createHref="/admin/events/new" editBase="/admin/events" search={q} rows={rows as unknown as Record<string, unknown>[]} columns={[{ key: "name", label: "Event" }, { key: "date", label: "Date" }, { key: "location", label: "Location" }, { key: "status", label: "Status" }]} deleteAction={deleteEventAction} />;
}