"use client";

import { useActionState } from "react";
import { newsletterSubscribeAction, type NewsletterFormState } from "@/lib/actions/inbox";

export default function NewsletterSignup() {
  const [state, formAction, isPending] = useActionState<NewsletterFormState, FormData>(newsletterSubscribeAction, null);
  return <form className="mt-8 space-y-4" action={formAction}>
    <div><label htmlFor="first-name" className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea]/40">First Name</label><input id="first-name" name="firstName" type="text" placeholder="Your first name" className="newsletter-input w-full border border-[#f7f3ea]/15 bg-[#17120c] px-4 py-3 text-sm text-[#f7f3ea] outline-none focus:border-[#f2c14e]" /></div>
    <div><label htmlFor="nl-email" className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea]/40">Email Address <span className="text-[#b3241b]">*</span></label><input id="nl-email" name="email" type="email" required placeholder="your@email.com" className="newsletter-input w-full border border-[#f7f3ea]/15 bg-[#17120c] px-4 py-3 text-sm text-[#f7f3ea] outline-none focus:border-[#f2c14e]" /></div>
    <button type="submit" disabled={isPending} className="mt-2 w-full bg-[#b3241b] py-4 text-[10px] font-black uppercase tracking-[0.25em] text-[#f7f3ea] transition-all hover:bg-[#f2c14e] hover:text-[#17120c]">{isPending ? "Subscribing..." : "Subscribe to The Brief →"}</button>
    {state?.success && <p className="text-center text-sm font-bold text-[#1a8f6e]">You&apos;re on the list. Welcome to the Brief.</p>}
    {state?.alreadySubscribed && <p className="text-center text-sm font-bold text-[#f2c14e]">That email is already subscribed.</p>}
    {state?.fieldErrors?.email && <p className="text-center text-sm font-bold text-[#f2c14e]">{state.fieldErrors.email[0]}</p>}
    {state?.error && <p className="text-center text-sm font-bold text-[#b3241b]">{state.error}</p>}
    <p className="text-center text-[10px] text-[#f7f3ea]/25">Free. Unsubscribe anytime. No spam.</p>
  </form>;
}
