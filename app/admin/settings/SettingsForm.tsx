"use client";

import dynamic from "next/dynamic";
import { useActionState } from "react";
import { saveSettingsAction, type SettingsFormState } from "@/lib/actions/settings";
import { AdminFormField, AdminInput, AdminTextarea } from "@/components/admin/AdminFormField";

const MediaSelector = dynamic(
  () => import("@/components/admin/MediaSelector"),
  { ssr: false, loading: () => <p className="text-xs text-white/40">Loading media picker…</p> }
);

export default function SettingsForm({
  initialValues,
}: {
  initialValues: Record<string, string>;
}) {
  const [state, formAction, pending] = useActionState<SettingsFormState, FormData>(
    saveSettingsAction,
    null
  );
  const field = (name: string, label: string, textarea = false) => (
    <AdminFormField label={label} name={name}>
      {textarea ? (
        <AdminTextarea id={name} name={name} defaultValue={initialValues[name]} />
      ) : (
        <AdminInput id={name} name={name} defaultValue={initialValues[name]} />
      )}
    </AdminFormField>
  );
  return (
    <form action={formAction} className="grid max-w-5xl gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <h2 className="border-b border-white/10 pb-3 text-sm font-black uppercase tracking-[0.15em] text-white/60">
          Brand
        </h2>
        {field("siteName", "Site Name")}
        {field("tagline", "Tagline")}
        {field("shortDescription", "Short Description", true)}
        <MediaSelector
          name="logoUrl"
          label="Site Logo"
          value={initialValues.logoUrl ?? ""}
          allowNone
          hint="Primary logo shown in header and meta."
        />
        <MediaSelector
          name="faviconUrl"
          label="Favicon"
          value={initialValues.faviconUrl ?? ""}
          allowNone
          hint="Browser tab icon. Square PNG or SVG recommended."
        />
        <h2 className="border-b border-white/10 pb-3 pt-5 text-sm font-black uppercase tracking-[0.15em] text-white/60">
          Contact
        </h2>
        {field("primaryEmail", "Primary Email")}
        {field("contactEmail", "Contact Email")}
        {field("phone", "Phone")}
        {field("whatsapp", "WhatsApp")}
      </div>
      <div className="space-y-5">
        <h2 className="border-b border-white/10 pb-3 text-sm font-black uppercase tracking-[0.15em] text-white/60">
          Social
        </h2>
        {field("instagram", "Instagram")}
        {field("tiktok", "TikTok")}
        {field("twitter", "X / Twitter")}
        {field("youtube", "YouTube")}
        {field("spotify", "Spotify")}
        {field("facebook", "Facebook")}
        <h2 className="border-b border-white/10 pb-3 pt-5 text-sm font-black uppercase tracking-[0.15em] text-white/60">
          SEO and Newsletter
        </h2>
        {field("siteUrl", "Site URL")}
        {field("defaultSeoTitle", "Default SEO Title")}
        {field("defaultSeoDescription", "Default SEO Description", true)}
        <MediaSelector
          name="defaultSocialImage"
          label="Default Social Image"
          value={initialValues.defaultSocialImage ?? ""}
          allowNone
          hint="1200×630 recommended. Used when a story has no social image."
        />
        {field("newsletterName", "Newsletter Name")}
        {field("newsletterDescription", "Newsletter Description", true)}
        <button
          disabled={pending}
          className="bg-[#b3241b] px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white disabled:opacity-50"
        >
          {pending ? "Saving..." : "Save Settings"}
        </button>
        {state?.success && (
          <p className="text-sm font-bold text-green-400">Settings saved.</p>
        )}
        {state?.error && (
          <p className="text-sm font-bold text-[#b3241b]">{state.error}</p>
        )}
      </div>
    </form>
  );
}