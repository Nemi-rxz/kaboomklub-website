import type { Metadata } from "next";
import Link from "next/link";
import EditorialFooter from "@/components/EditorialFooter";
import EditorialNavbar from "@/components/EditorialNavbar";
import { getServices } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Services",
  description:
    "KaboomKlub creative and media services — brand design, campaigns, playlist pitching, press releases, artist features and more for artists, labels and brands.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <EditorialNavbar />
      <main className="bg-[#f7f3ea] text-[#17120c]">

        {/* Header */}
        <section className="border-b border-[#17120c] bg-[#17120c] px-6 py-14 text-[#f7f3ea] sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px] grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#f2c14e]">Work With Us</p>
              <h1 className="mt-3 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
                Services
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#f7f3ea]/60">
                KaboomKlub provides creative and media services for artists, record labels, brands,
                agencies and entertainment businesses. From brand design to editorial features — we help you show
                up and get heard.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed text-[#f7f3ea]/50">
                Pricing is tailored to the scope and requirements of each project. Contact us to discuss your
                campaign and receive a tailored proposal.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="bg-[#b3241b] px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea] transition-all hover:bg-[#f7f3ea] hover:text-[#17120c]"
                >
                  Get A Quote
                </Link>
                <Link
                  href="/advertise"
                  className="border border-[#f7f3ea]/25 px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea]/70 transition-all hover:border-[#f2c14e] hover:text-[#f2c14e]"
                >
                  Advertising & Partnerships
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Who we work with */}
        <section className="border-b border-[#17120c]/15 bg-[#efe6d7] px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-[1600px]">
            <div className="flex flex-wrap items-center gap-6">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#17120c]/40 shrink-0">
                We work with
              </p>
              {["Artists", "Record Labels", "Brands", "PR Agencies", "Event Organizers", "Startups", "Agencies", "Creatives"].map((item) => (
                <span key={item} className="border border-[#17120c]/20 px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-[#17120c]/60">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Services grid */}
        <section className="mx-auto max-w-[1600px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          <div className="mb-10 border-b border-[#17120c] pb-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">
              {services.length} Services
            </p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">What We Offer</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service, i) => (
              <div
                key={service.id}
                id={service.slug}
                className="flex flex-col border border-[#17120c]/12 p-8 transition-all hover:border-[#17120c] hover:shadow-[4px_4px_0px_0px_rgba(23,18,12,1)]"
              >
                {/* Number */}
                <span className="text-4xl font-black text-[#17120c]/8">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-4 text-lg font-black uppercase leading-tight">{service.title}</h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5c4933]">{service.description}</p>

                {/* Audience */}
                <p className="mt-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#17120c]/40">
                  For: <span className="text-[#17120c]/60">{service.audience}</span>
                </p>

                {/* Deliverables */}
                <ul className="mt-4 space-y-2">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-xs text-[#17120c]/60">
                      <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b3241b]" />
                      {d}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-[#17120c]/10 pt-5">
                  <p className="mb-4 text-[10px] italic text-[#17120c]/40">
                    Pricing tailored to project scope — contact us for a proposal.
                  </p>
                  <Link
                    href={service.ctaHref}
                    className="block bg-[#17120c] py-3 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea] transition-all hover:bg-[#b3241b]"
                  >
                    {service.ctaLabel} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process strip */}
        <section className="border-y border-[#17120c] bg-[#efe6d7] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-10 border-b border-[#17120c] pb-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">How It Works</p>
              <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">Our Process</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { step: "01", title: "Contact Us", desc: "Tell us about your project, goals, and timeline via our contact form or email." },
                { step: "02", title: "We Discuss", desc: "We review your brief and schedule a conversation to understand exactly what you need." },
                { step: "03", title: "Get A Proposal", desc: "We send a tailored proposal with scope, deliverables, and pricing." },
                { step: "04", title: "We Deliver", desc: "Once agreed, we execute the project to the highest standard and deliver on time." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="border border-[#17120c]/12 bg-white p-6">
                  <span className="text-5xl font-black text-[#17120c]/10">{step}</span>
                  <h3 className="mt-3 text-base font-black uppercase">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5c4933]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-14 sm:px-10 sm:py-20 lg:px-16">
          <div className="mx-auto max-w-[1600px] grid gap-8 border border-[#17120c] p-8 lg:grid-cols-[1fr_auto] lg:items-center sm:p-14">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Let&apos;s Talk</p>
              <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl">
                Ready to Work<br />With KaboomKlub?
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#5c4933]">
                Whether you&apos;re an artist launching a project, a brand running a campaign, or a label looking for
                editorial support — we&apos;d love to hear from you.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/contact"
                className="bg-[#17120c] px-10 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea] transition-all hover:bg-[#b3241b]"
              >
                Contact Kaboomklub →
              </Link>
              <Link
                href="/advertise"
                className="border border-[#17120c] px-10 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-[#17120c] hover:text-[#f7f3ea]"
              >
                Advertising & Partnerships →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <EditorialFooter />
    </>
  );
}
