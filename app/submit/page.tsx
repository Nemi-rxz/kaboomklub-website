import type { Metadata } from "next";
import Link from "next/link";
import EditorialFooter from "@/components/EditorialFooter";
import EditorialNavbar from "@/components/EditorialNavbar";

export const metadata: Metadata = {
  title: "Submit",
  description:
    "Submit music, press releases, artist announcements, events and news to KaboomKlub for editorial consideration.",
};

const submissionTypes = [
  {
    id: "music",
    title: "Music Submission",
    desc: "Submit a single, EP, album or music video for editorial consideration — playlist placement, reviews, and artist features.",
    tags: ["Singles", "EPs", "Albums", "Music Videos"],
    cta: "Submit Music",
  },
  {
    id: "press",
    title: "Press Release",
    desc: "Send us artist announcements, new release press releases, label news, brand news, or event announcements for editorial publication.",
    tags: ["Artists", "Labels", "Brands", "Events"],
    cta: "Send Press Release",
  },
  {
    id: "interview",
    title: "Interview Request",
    desc: "Pitch an interview, artist spotlight, or KaboomKlub feature for an artist, executive, creative, or cultural figure.",
    tags: ["Interviews", "Artist Spotlight", "Features"],
    cta: "Request An Interview",
  },
  {
    id: "event",
    title: "Event Submission",
    desc: "Submit a concert, festival, creative industry event, listening session or cultural gathering for KaboomKlub coverage.",
    tags: ["Concerts", "Festivals", "Mixers", "Events"],
    cta: "Submit An Event",
  },
  {
    id: "news",
    title: "News Tip",
    desc: "Send us a music, entertainment, culture, or business news tip that you think KaboomKlub should cover.",
    tags: ["Music News", "Entertainment", "Culture", "Business"],
    cta: "Send A Tip",
  },
  {
    id: "collab",
    title: "Collaboration",
    desc: "Pitch a creative collaboration, media partnership, brand partnership or joint project between your team and KaboomKlub.",
    tags: ["Partnerships", "Brands", "Media", "Creative"],
    cta: "Pitch A Collaboration",
  },
];

export default function SubmitPage() {
  return (
    <>
      <EditorialNavbar />
      <main className="bg-[#f7f3ea] text-[#17120c]">

        {/* Header */}
        <section className="border-b border-[#17120c] bg-[#17120c] px-6 py-14 text-[#f7f3ea] sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px]">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#f2c14e]">Send It In</p>
            <h1 className="mt-3 text-6xl font-black uppercase leading-none tracking-tight sm:text-8xl">
              Submit
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#f7f3ea]/60">
              Send KaboomKlub your music, press releases, event news, interview requests, and collaboration pitches.
              We review everything and respond to submissions that are a good fit for the platform.
            </p>
          </div>
        </section>

        {/* Submission types */}
        <section className="mx-auto max-w-[1600px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          <div className="mb-10 border-b border-[#17120c] pb-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">What Can I Submit?</p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">Submission Types</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {submissionTypes.map((type) => (
              <div key={type.id} className="flex flex-col border border-[#17120c]/12 p-7 transition-all hover:border-[#17120c] hover:shadow-[4px_4px_0px_0px_rgba(23,18,12,1)]">
                <h3 className="text-base font-black uppercase">{type.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5c4933]">{type.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {type.tags.map((tag) => (
                    <span key={tag} className="border border-[#17120c]/12 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#17120c]/45">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/contact?type=submit&subject=${encodeURIComponent(type.title)}`}
                  className="mt-6 block bg-[#17120c] py-3 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea] transition-all hover:bg-[#b3241b]"
                >
                  {type.cta} →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Guidelines */}
        <section className="border-y border-[#17120c] bg-[#efe6d7] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px] grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Before You Submit</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none tracking-tight">
                Submission Guidelines
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  "KaboomKlub covers African music, entertainment, culture and business — submissions should be relevant to these areas.",
                  "We review every submission but cannot guarantee a response or publication for all submitted content.",
                  "Music submissions should include a streaming or download link, artist bio, and any relevant press materials.",
                  "Press releases should be professionally written and ready to publish. Include images and relevant links.",
                  "Interview pitches should include a brief on who you want us to interview and why it is relevant to our audience.",
                  "We do not charge for organic editorial coverage — if you are looking for guaranteed placement, see our Services page.",
                ].map((g, i) => (
                  <div key={i} className="flex gap-4 border-b border-[#17120c]/10 pb-4 last:border-0">
                    <span className="mt-0.5 shrink-0 text-sm font-black text-[#b3241b]">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-sm leading-relaxed text-[#5c4933]">{g}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="border border-[#17120c]/12 bg-white p-7">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Guaranteed Coverage</p>
                <h3 className="mt-3 text-xl font-black uppercase">Want Guaranteed Placement?</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5c4933]">
                  Organic submissions are reviewed on editorial merit. If you need guaranteed editorial features,
                  sponsored articles, or playlist placement, see our Services page.
                </p>
                <Link
                  href="/services"
                  className="mt-5 block border border-[#17120c] py-3 text-center text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-[#17120c] hover:text-[#f7f3ea]"
                >
                  View Our Services →
                </Link>
              </div>

              <div className="border border-[#17120c] bg-[#17120c] p-7 text-[#f7f3ea]">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f2c14e]">Direct Contact</p>
                <h3 className="mt-3 text-xl font-black uppercase">Have Questions?</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#f7f3ea]/60">
                  For urgent inquiries or commercial discussions, contact us directly through our contact page.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 block bg-[#b3241b] py-3 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea] transition-all hover:bg-[#f7f3ea] hover:text-[#17120c]"
                >
                  Contact KaboomKlub →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <EditorialFooter />
    </>
  );
}
