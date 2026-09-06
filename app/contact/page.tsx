"use client";

import { useActionState } from "react";
import Link from "next/link";
import EditorialFooter from "@/components/EditorialFooter";
import EditorialNavbar from "@/components/EditorialNavbar";
import { contactFormAction, type InquiryFormState } from "@/lib/actions/inbox";

const serviceOptions = [
  "Brand Design & Identity",
  "Promotional Content Design",
  "Digital Campaign Management",
  "Landing Page / Website Design",
  "Playlist Pitching",
  "Press Release / Announcement",
  "Artist Spotlight & Features",
  "Collaborations",
  "Sponsored Ads",
  "Audience Growth Strategy",
  "Advertising / Media Partnership",
  "Editorial / Interview Request",
  "Event Coverage",
  "Other",
];

const budgetOptions = [
  "Under $500",
  "$500 – $1,000",
  "$1,000 – $3,000",
  "$3,000 – $5,000",
  "$5,000+",
  "Prefer not to say",
];

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState<InquiryFormState, FormData>(contactFormAction, null);

  return (
    <>
      <EditorialNavbar />
      <main className="bg-[#f7f3ea] text-[#17120c]">

        {/* Header */}
        <section className="border-b border-[#17120c] bg-[#17120c] px-6 py-14 text-[#f7f3ea] sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px] grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#f2c14e]">Get In Touch</p>
              <h1 className="mt-3 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl">
                Contact<br />KaboomKlub
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#f7f3ea]/60">
                Whether you&apos;re an artist, label, brand or business — let&apos;s talk. Fill in the form and we&apos;ll
                get back to you with a response or tailored proposal.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Services", href: "/services" },
                { label: "Advertise", href: "/advertise" },
                { label: "Submit Music", href: "/submit" },
                { label: "Newsletter", href: "/newsletter" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border border-[#f7f3ea]/15 p-4 text-center text-[11px] font-black uppercase tracking-[0.18em] text-[#f7f3ea]/55 transition-all hover:border-[#f2c14e] hover:text-[#f2c14e]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="mx-auto max-w-[1600px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">

            {/* Main form */}
            <div>
              <div className="mb-8 border-b border-[#17120c] pb-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Enquiry Form</p>
                <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">Tell Us About Your Project</h2>
              </div>

              <form className="space-y-6" action={formAction}>
                {/* Name + Company */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-[10px] font-black uppercase tracking-[0.25em] text-[#17120c]/60">
                      Name <span className="text-[#b3241b]">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your full name"
                      className="w-full border border-[#17120c]/20 bg-white px-4 py-3 text-sm text-[#17120c] outline-none placeholder:text-[#17120c]/30 focus:border-[#17120c]"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="mb-2 block text-[10px] font-black uppercase tracking-[0.25em] text-[#17120c]/60">
                      Company / Artist Name
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Your company or artist name"
                      className="w-full border border-[#17120c]/20 bg-white px-4 py-3 text-sm text-[#17120c] outline-none placeholder:text-[#17120c]/30 focus:border-[#17120c]"
                    />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="mb-2 block text-[10px] font-black uppercase tracking-[0.25em] text-[#17120c]/60">
                      Email <span className="text-[#b3241b]">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="w-full border border-[#17120c]/20 bg-white px-4 py-3 text-sm text-[#17120c] outline-none placeholder:text-[#17120c]/30 focus:border-[#17120c]"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-[10px] font-black uppercase tracking-[0.25em] text-[#17120c]/60">
                      Phone (Optional)
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+234 000 000 0000"
                      className="w-full border border-[#17120c]/20 bg-white px-4 py-3 text-sm text-[#17120c] outline-none placeholder:text-[#17120c]/30 focus:border-[#17120c]"
                    />
                  </div>
                </div>

                {/* Service required */}
                <div>
                  <label htmlFor="service" className="mb-2 block text-[10px] font-black uppercase tracking-[0.25em] text-[#17120c]/60">
                    Service Required <span className="text-[#b3241b]">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    className="w-full border border-[#17120c]/20 bg-white px-4 py-3 text-sm text-[#17120c] outline-none focus:border-[#17120c]"
                  >
                    <option value="">Select a service...</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label htmlFor="budget" className="mb-2 block text-[10px] font-black uppercase tracking-[0.25em] text-[#17120c]/60">
                    Budget Range (Optional)
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className="w-full border border-[#17120c]/20 bg-white px-4 py-3 text-sm text-[#17120c] outline-none focus:border-[#17120c]"
                  >
                    <option value="">Select a budget range...</option>
                    {budgetOptions.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* Timeline */}
                <div>
                  <label htmlFor="timeline" className="mb-2 block text-[10px] font-black uppercase tracking-[0.25em] text-[#17120c]/60">
                    Preferred Timeline
                  </label>
                  <input
                    id="timeline"
                    name="timeline"
                    type="text"
                    placeholder="e.g. Within 2 weeks, by end of month..."
                    className="w-full border border-[#17120c]/20 bg-white px-4 py-3 text-sm text-[#17120c] outline-none placeholder:text-[#17120c]/30 focus:border-[#17120c]"
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="mb-2 block text-[10px] font-black uppercase tracking-[0.25em] text-[#17120c]/60">
                    Project Description <span className="text-[#b3241b]">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={6}
                    placeholder="Tell us about your project, goals, and what you need from KaboomKlub..."
                    className="w-full resize-none border border-[#17120c]/20 bg-white px-4 py-3 text-sm text-[#17120c] outline-none placeholder:text-[#17120c]/30 focus:border-[#17120c]"
                  />
                </div>

                <div>
                  <p className="mb-5 text-[10px] italic text-[#17120c]/40">
                    Pricing is tailored to the scope and requirements of each project. We will respond with a tailored proposal.
                  </p>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-[#17120c] py-4 text-[10px] font-black uppercase tracking-[0.25em] text-[#f7f3ea] transition-all hover:bg-[#b3241b] sm:w-auto sm:px-12"
                  >
                    {isPending ? "Sending..." : "Send Enquiry →"}
                  </button>
                  {state?.success && <p className="mt-4 text-sm font-bold text-[#1a8f6e]">Thanks. We&apos;ll be in touch soon.</p>}
                  {state?.error && <p className="mt-4 text-sm font-bold text-[#b3241b]">{state.error}</p>}
                  {state?.fieldErrors && <p className="mt-4 text-sm font-bold text-[#b3241b]">Please check the highlighted fields and try again.</p>}
                </div>
              </form>
            </div>

            {/* Sidebar info */}
            <div className="space-y-6">
              <div className="border border-[#17120c]/12 p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Response Time</p>
                <p className="mt-3 text-sm leading-relaxed text-[#5c4933]">
                  We aim to respond to all enquiries within 2–3 business days.
                </p>
              </div>

              <div className="border border-[#17120c] bg-[#17120c] p-6 text-[#f7f3ea]">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f2c14e]">Quick Links</p>
                <div className="mt-4 space-y-3">
                  {[
                    { label: "View Our Services", href: "/services" },
                    { label: "Advertising & Partnerships", href: "/advertise" },
                    { label: "Submit Music", href: "/submit" },
                    { label: "About KaboomKlub", href: "/about" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block border-b border-[#f7f3ea]/10 py-2 text-[11px] font-black uppercase tracking-[0.15em] text-[#f7f3ea]/55 transition-colors hover:text-[#f2c14e] last:border-0"
                    >
                      {item.label} →
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border border-[#17120c]/12 p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Follow Us</p>
                <div className="mt-4 space-y-2">
                  {[
                    { label: "Instagram", href: "https://www.instagram.com/kaboomklub/" },
                    { label: "TikTok", href: "https://www.tiktok.com/@kaboomklub" },
                    { label: "X / Twitter", href: "https://x.com/kaboomklub" },
                    { label: "YouTube", href: "https://www.youtube.com/@kaboomklub" },
                  ].map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[#17120c]/50 transition-colors hover:text-[#17120c]"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <EditorialFooter />
    </>
  );
}
