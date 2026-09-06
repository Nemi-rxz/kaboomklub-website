"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

const nav = [
  { href: "/admin", label: "Dashboard", icon: "⊡" },
  { href: "/admin/content", label: "Content", icon: "✎" },
  { href: "/admin/artists", label: "Artists", icon: "♪" },
  { href: "/admin/playlists", label: "Playlists", icon: "▶" },
  { href: "/admin/events", label: "Events", icon: "◈" },
  { href: "/admin/videos", label: "Videos", icon: "◉" },
  { href: "/admin/services", label: "Services", icon: "◆" },
  { href: "/admin/media", label: "Media", icon: "⬡" },
  { href: "/admin/submissions", label: "Submissions", icon: "↓" },
  { href: "/admin/inquiries", label: "Inquiries", icon: "✉" },
  { href: "/admin/newsletter", label: "Newsletter", icon: "◎" },
  { href: "/admin/settings", label: "Settings", icon: "⚙" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-56 shrink-0 flex-col border-r border-[#2a2a2a] bg-[#111111]">
      {/* Logo */}
      <div className="border-b border-[#2a2a2a] px-5 py-4">
        <Link href="/admin" className="block">
          <span className="text-base font-black uppercase tracking-tight text-white">
            Kaboom<span className="text-[#b3241b]">Klub</span>
          </span>
          <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
            Admin
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-0.5">
          {nav.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors ${
                    isActive
                      ? "bg-[#b3241b] text-white"
                      : "text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="w-4 text-center text-sm leading-none">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-[#2a2a2a] px-5 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            target="_blank"
            className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/30 hover:text-white/60"
          >
            View Site ↗
          </Link>
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}
