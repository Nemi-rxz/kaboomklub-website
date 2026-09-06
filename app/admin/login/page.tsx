"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction, LoginState } from "@/lib/actions/auth";

function LoginForm() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-[#b3241b] py-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea] transition-all hover:bg-[#f2c14e] hover:text-[#17120c] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Signing in..." : "Sign In"}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useFormState<LoginState, FormData>(loginAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080b10]">
      <div className="w-full max-w-md px-6">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black uppercase tracking-tight text-white">
            Kaboom<span className="text-[#b3241b]">Klub</span>
          </h1>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            Admin Portal
          </p>
        </div>

        {/* Login Form */}
        <div className="rounded-lg border border-white/10 bg-[#111111] p-8">
          <h2 className="mb-6 text-xl font-black uppercase tracking-tight text-white">
            Sign In
          </h2>

          <form action={formAction} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-white/50"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@kaboomklub.com"
                className="w-full border border-white/10 bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#b3241b] transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-white/50"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full border border-white/10 bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#b3241b] transition-colors"
              />
            </div>

            {/* Error Message */}
            {state?.error && (
              <div className="rounded border border-[#b3241b] bg-[#b3241b]/10 px-4 py-3">
                <p className="text-[10px] font-bold text-[#b3241b]">{state.error}</p>
              </div>
            )}

            {/* Submit Button */}
            <LoginForm />
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/30 hover:text-white/60"
          >
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}