import Link from "next/link";
import {
  Show,
  UserButton,
} from "@clerk/nextjs";

export default function NavActions() {
  return (
    <div className="hidden items-center gap-2 md:flex">
      
      {/* USER IS LOGGED OUT */}
      <Show when="signed-out">
        <Link
          href="/sign-in"
          className="group relative rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-950"
        >
          <span className="relative z-10">
            Login
          </span>
        </Link>

        <Link
          href="/sign-up"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg active:translate-y-0"
        >
          {/* Shine effect */}
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

          <span className="relative">
            Get Started
          </span>

          <svg
            className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </Link>
      </Show>

      {/* USER IS LOGGED IN */}
      <Show when="signed-in">
        <Link
          href="/dashboard"
          className="group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-950"
        >
          {/* Dashboard icon */}
          <svg
            className="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>

          <span>Dashboard</span>
        </Link>

        {/* Separator */}
        <div className="h-7 w-px bg-slate-200" />

        {/* User area */}
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
          
          {/* Online indicator */}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />

            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>

          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-8 w-8",
              },
            }}
          />
        </div>
      </Show>
    </div>
  );
}