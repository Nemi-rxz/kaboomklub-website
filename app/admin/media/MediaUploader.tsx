"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MediaUploader() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  async function upload(formData: FormData) {
    setStatus("Uploading...");
    const response = await fetch("/api/upload", { method: "POST", body: formData });
    const result = await response.json();
    if (!response.ok) { setStatus(result.error ?? "Upload failed"); return; }
    setStatus("Uploaded.");
    router.refresh();
  }
  return <form action={upload} className="flex flex-wrap items-end gap-3 border border-white/10 bg-[#111] p-5"><label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Choose image<input name="file" type="file" accept="image/jpeg,image/png,image/webp,image/gif" required className="mt-2 block text-xs text-white/60" /></label><button className="bg-[#b3241b] px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white">Upload</button>{status && <span className="text-xs text-white/50">{status}</span>}</form>;
}