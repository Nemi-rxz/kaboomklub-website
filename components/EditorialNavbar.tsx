import Link from "next/link";
import Image from "next/image";

export default function EditorialNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#17120c] bg-[#f7f3ea]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/kaboom-logo.jpg"
            alt="KaboomKlub Logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span className="text-xl font-black tracking-tighter uppercase">
            Kaboom<span className="text-[#b3241b]">Klub</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {["MUSIC", "ENTERTAINMENT", "LIFESTYLE", "SERVICES"].map((cat) => (
            <Link
              key={cat}
              href={`/category/${cat.toLowerCase()}`}
              className="text-xs font-bold tracking-[0.2em] hover:text-[#b3241b] transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden text-[10px] font-bold uppercase tracking-[0.1em] text-[#17120c]/40 lg:block">
            @kaboomklub // Entertainment + Afrobeats + Lifestyle
          </span>
          <Link
            href="https://www.instagram.com/kaboomklub/"
            className="border border-[#17120c] px-4 py-2 text-xs font-black uppercase tracking-widest transition-all hover:bg-[#17120c] hover:text-[#f7f3ea]"
          >
            Instagram
          </Link>
        </div>
      </div>
    </nav>
  );
}
