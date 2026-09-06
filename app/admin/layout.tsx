import AdminSidebar from "@/components/admin/AdminSidebar";
import { Suspense } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#080b10]">
      <Suspense fallback={<aside className="w-56 shrink-0 border-r border-[#2a2a2a] bg-[#111111]" />}>
        <AdminSidebar />
      </Suspense>
      <main className="flex-1 overflow-y-auto">
        <Suspense fallback={<div className="p-8 text-sm text-white/40">Loading admin workspace...</div>}>
          {children}
        </Suspense>
      </main>
    </div>
  );
}