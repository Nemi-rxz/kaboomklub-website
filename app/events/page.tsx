import type { Metadata } from "next";
import PublicImage from "@/components/PublicImage";
import Link from "next/link";
import EditorialFooter from "@/components/EditorialFooter";
import EditorialNavbar from "@/components/EditorialNavbar";
import PostCard from "@/components/PostCard";
import { getEvents, getPostsByCategory } from "@/lib/posts";
import EventListLd from "@/components/seo/EventListLd";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Concerts, festivals, music events, industry mixers and cultural events across Africa — curated by KaboomKlub.",
};

export default async function EventsPage() {
  const events = await getEvents();
  const entertainmentPosts = (await getPostsByCategory("entertainment")).slice(0, 3);

  const items = events.map((e) => ({
    name: e.name,
    url: e.href || undefined,
    startDate: e.date || undefined,
    locationName: e.location || undefined,
    image: e.image || undefined,
    description: e.description || undefined,
    organizerName: e.organizer || undefined,
  }));

  return (
    <>
      <EventListLd items={items} />
      <EditorialNavbar />
      <main className="bg-[#f7f3ea] text-[#17120c]">

        {/* Header */}
        <section className="border-b border-[#17120c] bg-[#17120c] px-6 py-14 text-[#f7f3ea] sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px]">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#f2c14e]">Live & Culture</p>
            <h1 className="mt-3 text-6xl font-black uppercase leading-none tracking-tight sm:text-8xl lg:text-[120px]">
              Events
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#f7f3ea]/60">
              Concerts, festivals, music events, creative industry mixers and cultural events happening across Africa
              — curated and covered by KaboomKlub.
            </p>
          </div>
        </section>

        {/* Events listing */}
        <section className="mx-auto max-w-[1600px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          {events.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg font-black uppercase text-[#17120c]/30">No upcoming events right now.</p>
              <p className="mt-3 text-sm text-[#5c4933]">Check back soon — we&apos;re always finding new events to cover.</p>
              <Link href="/entertainment" className="mt-6 inline-block text-[10px] font-black uppercase tracking-[0.2em] text-[#b3241b]">
                Browse Entertainment →
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8 border-b border-[#17120c] pb-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Upcoming</p>
                <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">Events</h2>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {events.map((event) => (
                  <div key={event.id} className="flex flex-col border border-[#17120c]/12 transition-all hover:border-[#17120c] hover:shadow-[4px_4px_0px_0px_rgba(23,18,12,1)]">
                    {/* Event colour bar */}
                    <div className="h-2 bg-[#f2c14e]" />
                    <div className="flex flex-1 flex-col p-8">
                        <div className="relative mb-6 aspect-[16/7] overflow-hidden bg-[#17120c]">
                          <PublicImage src={event.image} alt={event.name} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                        </div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f2c14e]">
                            {event.date}
                          </p>
                          <h3 className="mt-2 text-2xl font-black uppercase leading-tight">{event.name}</h3>
                        </div>
                        <span className="shrink-0 border border-[#17120c]/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-[#17120c]/50">
                          {event.location}
                        </span>
                      </div>

                      <p className="mt-4 flex-1 text-base leading-relaxed text-[#5c4933]">{event.description}</p>

                      {event.artists.length > 0 && (
                        <div className="mt-5">
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#17120c]/40">Featuring</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {event.artists.map((a) => (
                              <span key={a} className="border border-[#17120c]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#17120c]/60">
                                {a}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-6 flex items-center justify-between border-t border-[#17120c]/10 pt-5">
                        <p className="text-[10px] font-bold text-[#17120c]/40">
                          Organized by {event.organizer}
                        </p>
                        <Link
                          href={event.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-black uppercase tracking-[0.2em] text-[#b3241b] transition-colors hover:text-[#17120c]"
                        >
                          Learn More →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Entertainment stories */}
        {entertainmentPosts.length > 0 && (
          <section className="border-t border-[#17120c] bg-[#efe6d7] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
            <div className="mx-auto max-w-[1600px]">
              <div className="mb-8 flex items-end justify-between border-b border-[#17120c] pb-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#7c3aed]">Coverage</p>
                  <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">Entertainment Stories</h2>
                </div>
                <Link href="/entertainment" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#17120c]/50 hover:text-[#7c3aed]">
                  All Entertainment →
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {entertainmentPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Host an event CTA */}
        <section className="border-t border-[#17120c] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px] grid gap-8 border border-[#17120c] p-8 lg:grid-cols-[1fr_auto] lg:items-center sm:p-12">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f2c14e]">Partner</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl">
                Get Your Event Covered
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#5c4933]">
                Event organizers, promoters, and brands — submit your event for KaboomKlub coverage, editorial
                features, and promotional support.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/contact?type=events" className="bg-[#17120c] px-8 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea] transition-all hover:bg-[#b3241b]">
                Submit An Event →
              </Link>
              <Link href="/advertise" className="border border-[#17120c] px-8 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-[#17120c] hover:text-[#f7f3ea]">
                Event Sponsorship →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <EditorialFooter />
    </>
  );
}
