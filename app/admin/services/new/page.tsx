import Link from "next/link";
import CrudForm from "../../shared/CrudForm";
import { saveServiceAction } from "@/lib/actions/services";

const fields = [{ name: "title", label: "Service Name", required: true }, { name: "slug", label: "Slug" }, { name: "description", label: "Description", type: "textarea" as const }, { name: "audience", label: "Audience", type: "textarea" as const }, { name: "deliverables", label: "Deliverables", type: "textarea" as const, hint: "One per line" }, { name: "ctaLabel", label: "CTA Label" }, { name: "ctaHref", label: "CTA URL" }, { name: "order", label: "Order" }, { name: "status", label: "Status", type: "select" as const, options: ["DRAFT", "PUBLISHED", "ARCHIVED"] }];

export default function NewServicePage() { return <div className="p-8 text-white"><div className="mb-8 flex justify-between"><h1 className="text-3xl font-black uppercase">New Service</h1><Link href="/admin/services" className="text-xs uppercase text-white/50">Back</Link></div><CrudForm id={null} action={saveServiceAction} fields={fields} submitLabel="Save Service" /></div>; }