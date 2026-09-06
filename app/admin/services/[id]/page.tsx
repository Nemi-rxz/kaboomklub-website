import { notFound } from "next/navigation";
import { connection } from "next/server";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { ServiceModel } from "@/lib/models/Service";
import { saveServiceAction } from "@/lib/actions/services";
import { requireSession } from "@/lib/session";
import CrudForm from "../../shared/CrudForm";

const fields = [{ name: "title", label: "Service Name", required: true }, { name: "slug", label: "Slug" }, { name: "description", label: "Description", type: "textarea" as const }, { name: "audience", label: "Audience", type: "textarea" as const }, { name: "deliverables", label: "Deliverables", type: "textarea" as const }, { name: "ctaLabel", label: "CTA Label" }, { name: "ctaHref", label: "CTA URL" }, { name: "order", label: "Order" }, { name: "status", label: "Status", type: "select" as const, options: ["DRAFT", "PUBLISHED", "ARCHIVED"] }];

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; await connection(); await requireSession(); await connectDB(); const service = await ServiceModel.findById(id).lean(); if (!service) notFound(); const values = { title: service.title, slug: service.slug, description: service.description, audience: service.audience, deliverables: service.deliverables.join("\n"), ctaLabel: service.ctaLabel, ctaHref: service.ctaHref, order: String(service.order), status: service.status }; return <div className="p-8 text-white"><div className="mb-8 flex justify-between"><h1 className="text-3xl font-black uppercase">Edit Service</h1><Link href="/admin/services" className="text-xs uppercase text-white/50">Back</Link></div><CrudForm id={id} action={saveServiceAction} fields={fields} values={values} submitLabel="Save Service" /></div>; }