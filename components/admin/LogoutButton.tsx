"use client";

import { logoutAction } from "@/lib/actions/auth";

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/30 hover:text-[#b3241b]"
      >
        Logout
      </button>
    </form>
  );
}