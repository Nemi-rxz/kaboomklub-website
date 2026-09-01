"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const primaryNav = [
  { href: "/music", label: "Music" },
  { href: "/entertainment", label: "Entertainment" },
  { href: "/culture", label: "Culture" },
  { href: "/business", label: "Business" },
  { href: "/features", label: "Features" },
  { href: "/playlists", label: "Playlists" },
  { href: "/artists", label: "Artists" },
  { href: "/events", label: "Events" },
  { href: "/video", label: "Video" },
];

const secondaryNav = [
  { href: "/stories", label: "All Stories" },
  { href: "/services", label: "Services" },
  { href: "/advertise", label: "Advertise" },
  { href: "/submit", label: "Submit" },
  { href: "/about", label: "About" },
  { href: "/search", label: "Search" },
];

export default function EditorialNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-[#17120c] bg-[#f7f3ea]/97 backdrop-blur-md">
        {/* Main bar */}
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-3 sm:px-10 lg:px-16">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image
              src="/kaboom-logo.jpg"
              alt="KaboomKlub"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
            <span className="text-lg font-black uppercase tracking-tighter">
              Kaboom<span className="text-[#b3241b]">Klub</span>
            </span>
          </Link>

          {/* Desktop primary nav */}
          <div className="hidden items-center gap-6 xl:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[11px] font-black uppercase tracking-[0.18em] text-[#17120c]/65 transition-colors hover:text-[#b3241b]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/search"
              aria-label="Search"
              className="hidden items-center justify-center border border-[#17120c]/20 p-2 text-[#17120c]/55 transition-colors hover:border-[#17120c] hover:text-[#17120c] sm:flex"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </Link>
            <Link
              href="/newsletter"
              className="hidden border border-[#b3241b] bg-[#b3241b] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea] transition-all hover:bg-transparent hover:text-[#b3241b] sm:block"
            >
              Newsletter
            </Link>
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] xl:hidden"
            >
              <span className={`block h-[2px] w-5 bg-[#17120c] transition-all duration-200 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-[2px] w-5 bg-[#17120c] transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-[2px] w-5 bg-[#17120c] transition-all duration-200 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {/* Secondary strip — desktop only */}
        <div className="hidden border-t border-[#17120c]/10 xl:block">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 sm:px-10 lg:px-16">
            <div className="flex items-center gap-8 overflow-x-auto py-2 trending-scroll">
              {secondaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="shrink-0 text-[10px] font-black uppercase tracking-[0.22em] text-[#17120c]/40 transition-colors hover:text-[#17120c]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.1em] text-[#17120c]/25">
              African Music, Culture, Business &amp; Entertainment
            </span>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[#080b10] text-[#f7f3ea] xl:hidden">
          {/* Mobile header */}
          <div className="flex shrink-0 items-center justify-between border-b border-[#f7f3ea]/10 px-6 py-4">
            <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
              <Image src="/kaboom-logo.jpg" alt="KaboomKlub" width={32} height={32} className="h-8 w-8 object-contain" />
              <span className="text-lg font-black uppercase tracking-tighter">
                Kaboom<span className="text-[#b3241b]">Klub</span>
              </span>
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 text-[#f7f3ea]/55 hover:text-[#f7f3ea]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile nav */}
          <div className="flex-1 px-6 py-8">
            <p className="mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#f7f3ea]/30">Sections</p>
            <div className="mb-10">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block border-b border-[#f7f3ea]/8 py-4 text-2xl font-black uppercase tracking-tight text-[#f7f3ea] transition-colors hover:text-[#f2c14e]"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <p className="mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#f7f3ea]/30">More</p>
            <div>
              {[...secondaryNav, { href: "/newsletter", label: "Newsletter" }, { href: "/contact", label: "Contact" }].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block border-b border-[#f7f3ea]/8 py-3 text-sm font-black uppercase tracking-[0.15em] text-[#f7f3ea]/55 transition-colors hover:text-[#f7f3ea]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="shrink-0 border-t border-[#f7f3ea]/10 px-6 py-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f7f3ea]/25">
              © 2026 KaboomKlub · Powered by Fish Art X
            </p>
          </div>
        </div>
      )}
    </>
  );
}
