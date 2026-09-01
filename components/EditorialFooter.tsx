import Link from "next/link";
import Image from "next/image";

const sections = [
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

const company = [
  { href: "/about", label: "About" },
  { href: "/stories", label: "All Stories" },
  { href: "/services", label: "Services" },
  { href: "/advertise", label: "Advertise" },
  { href: "/submit", label: "Submit" },
  { href: "/contact", label: "Contact" },
];

const social = [
  { href: "https://www.instagram.com/kaboomklub/", label: "Instagram" },
  { href: "https://www.tiktok.com/@kaboomklub", label: "TikTok" },
  { href: "https://x.com/kaboomklub", label: "X / Twitter" },
  { href: "https://www.youtube.com/@kaboomklub", label: "YouTube" },
  { href: "https://open.spotify.com/", label: "Spotify" },
];

export default function EditorialFooter() {
  return (
    <footer className="border-t-[6px] border-[#b3241b] bg-[#17120c] px-6 py-16 text-[#f7f3ea] sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-[1600px]">

        {/* Top grid */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.2fr_2.8fr]">

          {/* Brand column */}
          <div className="flex flex-col gap-7">
            <Link href="/" className="flex items-center gap-4">
              <Image
                src="/kaboom-logo.jpg"
                alt="KaboomKlub"
                width={52}
                height={52}
                className="h-14 w-14 object-contain"
              />
              <span className="text-3xl font-black uppercase tracking-tighter">
                Kaboom<span className="text-[#b3241b]">Klub</span>
              </span>
            </Link>

            <p className="max-w-[260px] text-sm leading-relaxed text-[#f7f3ea]/55">
              African Music, Culture, Business &amp; Entertainment. Discover the music, people, ideas and stories
              shaping Africa&apos;s culture and creative economy.
            </p>

            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#f2c14e]">Follow</p>
              <div className="flex flex-wrap gap-3">
                {social.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-black uppercase tracking-[0.15em] text-[#f7f3ea]/50 transition-colors hover:text-[#f7f3ea]"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/newsletter"
              className="w-fit border border-[#f7f3ea]/20 px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea]/70 transition-all hover:border-[#f2c14e] hover:text-[#f2c14e]"
            >
              The Kaboomklub Brief →
            </Link>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <h4 className="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-[#f2c14e]">Sections</h4>
              <ul className="space-y-3">
                {sections.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#f7f3ea]/55 transition-colors hover:text-[#f7f3ea]"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-[#f2c14e]">Company</h4>
              <ul className="space-y-3">
                {company.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#f7f3ea]/55 transition-colors hover:text-[#f7f3ea]"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-[#f2c14e]">Work With Us</h4>
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-[#f7f3ea]/50">
                  Artists, brands, labels and businesses — let&apos;s work together.
                </p>
                <Link
                  href="/services"
                  className="block border border-[#f7f3ea]/15 px-4 py-3 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea]/70 transition-all hover:border-[#f2c14e] hover:text-[#f2c14e]"
                >
                  Our Services
                </Link>
                <Link
                  href="/advertise"
                  className="block border border-[#f7f3ea]/15 px-4 py-3 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea]/70 transition-all hover:border-[#f2c14e] hover:text-[#f2c14e]"
                >
                  Advertise
                </Link>
                <Link
                  href="/contact"
                  className="block bg-[#b3241b] px-4 py-3 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea] transition-all hover:bg-[#f7f3ea] hover:text-[#17120c]"
                >
                  Contact Kaboomklub
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-[#f7f3ea]/10 pt-8 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f7f3ea]/30">
              © 2026 KaboomKlub. All rights reserved.
            </p>
            <p className="text-[10px] font-medium text-[#f7f3ea]/20">
              Kaboomklub is a media platform powered by Fish Art X.
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            {[
              { label: "Home", href: "/" },
              { label: "Stories", href: "/stories" },
              { label: "Music", href: "/music" },
              { label: "Artists", href: "/artists" },
              { label: "Services", href: "/services" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[10px] font-black uppercase tracking-[0.15em] text-[#f7f3ea]/35 transition-colors hover:text-[#f2c14e]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
