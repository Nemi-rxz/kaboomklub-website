const colours: Record<string, string> = {
  PUBLISHED: "bg-green-900/60 text-green-300",
  DRAFT:     "bg-yellow-900/60 text-yellow-300",
  ARCHIVED:  "bg-white/10 text-white/40",
  NEW:       "bg-blue-900/60 text-blue-300",
  REVIEWING: "bg-yellow-900/60 text-yellow-300",
  APPROVED:  "bg-green-900/60 text-green-300",
  REJECTED:  "bg-red-900/60 text-red-300",
  PUBLISHED_STATUS: "bg-green-900/60 text-green-300",
  IN_PROGRESS: "bg-blue-900/60 text-blue-300",
  CONTACTED:  "bg-purple-900/60 text-purple-300",
  COMPLETED:  "bg-green-900/60 text-green-300",
  ACTIVE:     "bg-green-900/60 text-green-300",
  UNSUBSCRIBED: "bg-white/10 text-white/40",
};

export default function StatusBadge({ status }: { status: string }) {
  const cls = colours[status] ?? "bg-white/10 text-white/40";
  return (
    <span className={`inline-block rounded px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.15em] ${cls}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}
