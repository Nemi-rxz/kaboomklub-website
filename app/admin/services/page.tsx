import { connection } from "next/server";
import { connectDB } from "@/lib/db";
import { ServiceModel } from "@/lib/models/Service";
import { deleteServiceAction } from "@/lib/actions/services";
import { requireSession } from "@/lib/session";
import CrudList from "../shared/CrudList";

export default async function ServicesAdminPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) { const { q } = await searchParams; await connection(); await requireSession(); await connectDB(); const rows = await ServiceModel.find(q ? { title: { $regex: q, $options: "i" } } : {}).sort({ order: 1, createdAt: -1 }).lean(); return <CrudList title="Services" eyebrow="Commercial" createHref="/admin/services/new" editBase="/admin/services" search={q} rows={rows as unknown as Record<string, unknown>[]} columns={[{ key: "title", label: "Service" }, { key: "order", label: "Order" }, { key: "status", label: "Status" }]} deleteAction={deleteServiceAction} />; }