import Link from "next/link";
import CrudForm from "../../shared/CrudForm";
import { saveEventAction } from "@/lib/actions/events";

const fields = [{ name: "name", label: "Event Title", required: true }, { name: "slug", label: "Slug" }, { name: "date", label: "Date" }, { name: "location", label: "Venue / Location" }, { name: "description", label: "Description", type: "textarea" as const }, { name: "artists", label: "Artists", hint: "Comma-separated" }, { name: "organizer", label: "Organizer" }, { name: "href", label: "Event URL" }, { name: "image", label: "Event Image", type: "image" as const, allowNone: true }, { name: "status", label: "Status", type: "select" as const, options: ["DRAFT", "PUBLISHED", "ARCHIVED"] }, { name: "featured", label: "Featured", type: "checkbox" as const }];

export default function NewEventPage() { return <div className="p-8 text-white"><div className="mb-8 flex justify-between"><h1 className="text-3xl font-black uppercase">New Event</h1><Link href="/admin/events" className="text-xs uppercase text-white/50">Back</Link></div><CrudForm id={null} action={saveEventAction} fields={fields} submitLabel="Save Event" /></div>; }