"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AdminFormField } from "@/components/admin/AdminFormField";

type MediaLibraryItem = {
  id: string;
  url: string;
  thumbnailUrl: string;
  originalFilename: string;
  format?: string;
  tags?: string[];
};

type Mode = "library" | "upload" | "import" | "external" | "none";

const isCloudinary = (url: string | null | undefined) =>
  !!url && /^https?:\/\/res\.cloudinary\.com\//i.test(url.trim());

const bytesLabel = (n?: number) => {
  if (!n) return "";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
};

type Props = {
  name: string;
  label: string;
  value?: string;
  required?: boolean;
  hint?: string;
  allowNone?: boolean;
  onChange?: (value: string) => void;
};

export default function MediaSelector({
  name,
  label,
  value: initialValue,
  required,
  hint,
  allowNone = true,
  onChange,
}: Props) {
  const [selected, setSelected] = useState<string>(initialValue ?? "");
  const [mode, setMode] = useState<Mode>("library");

  useEffect(() => {
    setSelected(initialValue ?? "");
  }, [initialValue]);

  const commit = useCallback(
    (v: string) => {
      setSelected(v);
      onChange?.(v);
    },
    [onChange]
  );

  const externalSelected = selected && !isCloudinary(selected);
  const cloudinarySelected = isCloudinary(selected);

  return (
    <AdminFormField label={label} name={name} required={required} hint={hint}>
      <input type="hidden" id={name} name={name} value={selected} />
      <div className="border border-white/10 bg-[#111]">
        <div className="flex flex-wrap gap-2 border-b border-white/10 p-3">
          {(["library", "upload", "import", "external"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`px-3 py-2 text-[10px] font-black uppercase tracking-[0.15em] border ${
                mode === m
                  ? "bg-[#b3241b] border-[#b3241b] text-white"
                  : "border-white/10 text-white/60 hover:text-white"
              }`}
            >
              {m === "library"
                ? "Library"
                : m === "upload"
                ? "Upload"
                : m === "import"
                ? "Import URL"
                : "External URL"}
            </button>
          ))}
          {allowNone && (
            <button
              type="button"
              onClick={() => {
                commit("");
                setMode("none");
              }}
              className={`ml-auto px-3 py-2 text-[10px] font-black uppercase tracking-[0.15em] border ${
                mode === "none" || selected === ""
                  ? "bg-white/5 border-white/20 text-white"
                  : "border-white/10 text-white/60 hover:text-white"
              }`}
            >
              No Image / Clear
            </button>
          )}
        </div>
        <div className="p-4">
          {selected && (
            <div className="mb-4 flex flex-wrap items-center gap-3 border border-white/10 bg-black/40 p-3">
              <div className="relative h-20 w-28 shrink-0 overflow-hidden border border-white/10 bg-black">
                <img
                  src={selected}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <p className="truncate text-xs font-bold text-white">
                  {cloudinarySelected ? "Cloudinary media" : "External URL"}
                </p>
                <p className="truncate text-[10px] text-white/40 break-all">
                  {selected}
                </p>
                {externalSelected && (
                  <p className="text-[10px] text-amber-300/80">
                    External source (unoptimized rendering). Use Import URL to store it in Cloudinary.
                  </p>
                )}
              </div>
            </div>
          )}
          {mode === "library" && (
            <LibraryPicker onPick={(u) => commit(u)} current={selected} />
          )}
          {mode === "upload" && <UploadPicker onDone={(u) => commit(u)} />}
          {mode === "import" && <ImportPicker onDone={(u) => commit(u)} />}
          {mode === "external" && (
            <ExternalPicker current={selected} setValue={commit} />
          )}
          {mode === "none" && (
            <p className="text-xs text-white/40">
              Content will be saved without an image. A fallback logo may be
              shown on the public site if appropriate.
            </p>
          )}
        </div>
      </div>
    </AdminFormField>
  );
}

function LibraryPicker({
  onPick,
  current,
}: {
  onPick: (url: string) => void;
  current: string;
}) {
  const [q, setQ] = useState("");
  const [pending, setPending] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<MediaLibraryItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ page: String(page) });
      if (q.trim()) params.set("q", q.trim());
      const r = await fetch(`/api/media?${params.toString()}`);
      const json = await r.json();
      if (!r.ok) throw new Error(json.error ?? "Failed to load media");
      setItems(json.items ?? []);
      setTotal(json.total ?? 0);
      setTotalPages(json.totalPages ?? 1);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load media");
    } finally {
      setLoading(false);
    }
  }, [q, page]);

  useEffect(() => {
    const t = setTimeout(load, 150);
    return () => clearTimeout(t);
  }, [load]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
          }}
          placeholder="Search filenames or tags..."
          className="flex-1 border border-white/10 bg-[#1a1a1a] px-3 py-2.5 text-sm text-white outline-none"
        />
        {pending && (
          <span className="self-center text-xs text-white/40">Selected — confirm below</span>
        )}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-h-96 overflow-y-auto pr-1">
        {loading && <p className="col-span-full text-xs text-white/40">Loading...</p>}
        {!loading && error && (
          <p className="col-span-full text-xs font-bold text-[#b3241b]">{error}</p>
        )}
        {!loading && items.length === 0 && (
          <p className="col-span-full text-xs text-white/40">No media yet.</p>
        )}
        {items.map((item) => {
          const active = pending === item.url || current === item.url;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setPending(item.url)}
              className={`text-left overflow-hidden border bg-black transition-colors ${
                active
                  ? "border-[#b3241b] ring-1 ring-[#b3241b]"
                  : "border-white/10 hover:border-white/25"
              }`}
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-black/40">
                <img
                  src={item.thumbnailUrl || item.url}
                  alt={item.originalFilename}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="space-y-1 p-2">
                <p className="truncate text-[11px] font-bold text-white">
                  {item.originalFilename}
                </p>
                {item.tags && item.tags.length > 0 && (
                  <p className="truncate text-[10px] text-white/40">
                    {item.tags.slice(0, 2).join(", ")}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
      {(page > 1 || page < totalPages) && (
        <div className="flex items-center justify-between text-xs">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="border border-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] disabled:opacity-30"
          >
            ← Previous
          </button>
          <span className="text-white/40">
            Page {page} of {totalPages} · {total} items
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="border border-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] disabled:opacity-30"
          >
            Next →
          </button>
        </div>
      )}
      <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
        <button
          type="button"
          disabled={!pending}
          onClick={() => {
            if (pending) onPick(pending);
          }}
          className="bg-[#b3241b] px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] text-white disabled:opacity-40"
        >
          Use Selected Image
        </button>
      </div>
    </div>
  );
}

function UploadPicker({ onDone }: { onDone: (url: string) => void }) {
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState<string>("");
  async function submit(formData: FormData) {
    setStatus("Uploading...");
    try {
      const file = formData.get("file");
      if (!(file instanceof File)) {
        setStatus("Choose a file first.");
        return;
      }
      const r = await fetch("/api/upload", { method: "POST", body: formData });
      const json = await r.json();
      if (!r.ok) {
        setStatus(json.error ?? "Upload failed");
        return;
      }
      setPending(json.url);
      setStatus(`Uploaded: ${json.filename}`);
      onDone(json.url);
    } catch (e) {
      console.error(e);
      setStatus("Upload failed");
    }
  }
  return (
    <form action={submit} className="flex flex-wrap items-end gap-3">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
        Choose image
        <input
          name="file"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          required
          className="mt-2 block text-xs text-white/60"
        />
      </label>
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
        Tags (optional)
        <input
          name="tags"
          type="text"
          placeholder="cover, artist, interview"
          className="mt-2 block w-64 border border-white/10 bg-black px-3 py-2.5 text-xs text-white outline-none"
        />
      </label>
      <button className="bg-[#b3241b] px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white">
        Upload
      </button>
      {status && <span className="text-xs text-white/50">{status}</span>}
      {pending && (
        <span className="ml-auto text-xs text-white/60">
          Selected this upload automatically.
        </span>
      )}
    </form>
  );
}

function ImportPicker({ onDone }: { onDone: (url: string) => void }) {
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState<string>("");
  async function run() {
    if (!url.trim()) {
      setStatus("Paste an image URL first.");
      return;
    }
    setStatus("Importing...");
    try {
      const r = await fetch("/api/media/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), tags: tags.trim() }),
      });
      const json = await r.json();
      if (!r.ok) {
        setStatus(json.error ?? "Import failed");
        return;
      }
      setPending(json.url);
      setStatus(`Imported: ${json.filename ?? json.id}`);
      onDone(json.url);
    } catch (e) {
      console.error(e);
      setStatus("Import failed");
    }
  }
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
          Image URL (https://...)
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="mt-2 block w-full border border-white/10 bg-black px-3 py-2.5 text-xs text-white outline-none"
          />
        </label>
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
          Tags (optional)
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="press, feature"
            className="mt-2 block w-full border border-white/10 bg-black px-3 py-2.5 text-xs text-white outline-none"
          />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={run}
          className="bg-[#b3241b] px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white"
        >
          Import into Cloudinary
        </button>
        {status && <span className="text-xs text-white/50">{status}</span>}
        {pending && (
          <span className="ml-auto text-xs text-white/60">
            Auto-selected the imported image.
          </span>
        )}
      </div>
      <p className="text-[10px] text-white/30">
        The image will be validated, copied into Cloudinary, and a Media
        record created. Only publicly reachable HTTP(S) image URLs are
        accepted.
      </p>
    </div>
  );
}

function ExternalPicker({
  current,
  setValue,
}: {
  current: string;
  setValue: (v: string) => void;
}) {
  const [v, setV] = useState(
    current && !isCloudinary(current) ? current : ""
  );
  useEffect(() => {
    if (!isCloudinary(current)) setV(current);
  }, [current]);
  const preview = v.trim();
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 block">
        Paste any image URL
        <input
          value={v}
          onChange={(e) => {
            setV(e.target.value);
          }}
          placeholder="https://cdn.example.com/photo.jpg"
          className="mt-2 block w-full border border-white/10 bg-black px-3 py-2.5 text-xs text-white outline-none"
        />
      </label>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setValue(v.trim())}
          className="bg-[#b3241b] px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white disabled:opacity-40"
          disabled={!v.trim()}
        >
          Use External URL
        </button>
        <p className="text-[10px] text-white/40">
          The URL will be stored as-is and rendered with unoptimized
          Next/Image. Prefer Import when possible.
        </p>
      </div>
      {preview && (
        <div className="mt-2 border border-white/10 bg-black/40 p-3">
          <p className="text-[10px] text-white/40 mb-2">Preview:</p>
          <div className="relative max-h-56 w-full overflow-hidden">
            <img
              src={preview}
              alt=""
              className="max-w-full object-contain max-h-56"
            />
          </div>
        </div>
      )}
    </div>
  );
}
