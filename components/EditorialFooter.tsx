import Link from "next/link";
import Image from "next/image";

export default function EditorialFooter() {
  return (
    <footer className="bg-[#17120c] text-[#f7f3ea] py-20 px-6 sm:px-10 lg:px-16 border-t-[8px] border-[#b3241b]">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="flex flex-col gap-8">
            <Link href="/" className="flex items-center gap-4">
              <Image
                src="/kaboom-logo.jpg"
                alt="KaboomKlub Logo"
                width={60}
                height={60}
                className="h-16 w-16 object-contain"
              />
              <span className="text-4xl font-black tracking-tighter uppercase">
                Kaboom<span className="text-[#b3241b]">Klub</span>
              </span>
            </Link>
            <p className="max-w-xs text-lg font-medium text-[#f7f3ea]/60 leading-relaxed">
              KaboomKlub brings together the website and `@kaboomklub` Instagram around entertainment, Afrobeats, lifestyle, and regular culture updates.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#f2c14e]">Categories</h4>
              <ul className="flex flex-col gap-3 text-sm font-bold uppercase tracking-widest">
                <li><Link href="/category/music" className="hover:text-[#b3241b] transition-colors">Music</Link></li>
                <li><Link href="/category/entertainment" className="hover:text-[#b3241b] transition-colors">Entertainment</Link></li>
                <li><Link href="/category/lifestyle" className="hover:text-[#b3241b] transition-colors">Lifestyle</Link></li>
                <li><Link href="/category/services" className="hover:text-[#b3241b] transition-colors">Services</Link></li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#f2c14e]">Company</h4>
              <ul className="flex flex-col gap-3 text-sm font-bold uppercase tracking-widest">
                <li><Link href="/#about" className="hover:text-[#b3241b] transition-colors">About</Link></li>
                <li><Link href="/stories" className="hover:text-[#b3241b] transition-colors">Stories</Link></li>
                <li><Link href="https://www.instagram.com/kaboomklub/" className="hover:text-[#b3241b] transition-colors">Instagram</Link></li>
                <li><Link href="/#newsletter" className="hover:text-[#b3241b] transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div className="col-span-2 flex flex-col gap-8 sm:col-span-1">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#f2c14e]">Follow</h4>
              <div className="flex flex-col gap-4">
                <p className="text-sm leading-relaxed text-[#f7f3ea]/65">
                  For regular content and updates, follow the main page on Instagram.
                </p>
                <Link
                  href="https://www.instagram.com/kaboomklub/"
                  className="bg-[#b3241b] py-4 text-center text-xs font-black uppercase tracking-widest transition-all hover:bg-[#f7f3ea] hover:text-[#17120c]"
                >
                  OPEN INSTAGRAM
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-[#f7f3ea]/10 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#f7f3ea]/40">
            © 2026 KABOOMKLUB EDITORIAL. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
             {[
               { label: "IG", href: "https://www.instagram.com/kaboomklub/" },
               { label: "HOME", href: "/" },
               { label: "ALL", href: "/stories" },
               { label: "MUSIC", href: "/category/music" },
             ].map((social) => (
               <Link key={social.label} href={social.href} className="text-[10px] font-black hover:text-[#f2c14e] transition-colors">
                 {social.label}
               </Link>
             ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
