import { notFound } from "next/navigation";
import { connection } from "next/server";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { EventModel } from "@/lib/models/Event";
import { saveEventAction } from "@/lib/actions/events";
import { requireSession } from "@/lib/session";
import CrudForm from "../../shared/CrudForm";

const fields = [{ name: "name", label: "Event Title", required: true }, { name: "slug", label: "Slug" }, { name: "date", label: "Date" }, { name: "location", label: "Venue / Location" }, { name: "description", label: "Description", type: "textarea" as const }, { name: "artists", label: "Artists" }, { name: "organizer", label: "Organizer" }, { name: "href", label: "Event URL" }, { name: "image", label: "Image URL" }, { name: "status", label: "Status", type: "select" as const, options: ["DRAFT", "PUBLISHED", "ARCHIVED"] }, { name: "featured", label: "Featured", type: "checkbox" as const }];

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; await connection(); await requireSession(); await connectDB(); const event = await EventModel.findById(id).lean(); if (!event) notFound(); const values = { name: event.name, slug: event.slug, date: event.date, location: event.location, description: event.description, artists: event.artists.join(", "), organizer: event.organizer, href: event.href, image: event.image, status: event.status, featured: event.featured }; return <div className="p-8 text-white"><div className="mb-8 flex justify-between"><h1 className="text-3xl font-black uppercase">Edit Event</h1><Link href="/admin/events" className="text-xs uppercase text-white/50">Back</Link></div><CrudForm id={id} action={saveEventAction} fields={fields} values={values} submitLabel="Save Event" /></div>; }