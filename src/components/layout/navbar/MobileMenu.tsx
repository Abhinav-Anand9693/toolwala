"use client";

import { useState } from "react";
import Link from "next/link";
import { Show, UserButton } from "@clerk/nextjs";

import NavLink from "./NavLinks";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div className="md:hidden">
      {/* MENU BUTTON */}
      <button
        type="button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
      >
        {open ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h16" />
          </svg>
        )}
      </button>

      {/* MOBILE PANEL */}
      {open && (
        <>
          <div
            className="fixed inset-0 top-16 z-40 bg-slate-950/20 backdrop-blur-sm"
            onClick={closeMenu}
            aria-hidden="true"
          />

          <div className="absolute left-0 right-0 top-16 z-50 border-b border-slate-200 bg-white shadow-xl">
            <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">

              {/* NAVIGATION */}
              <nav className="flex flex-col gap-1">
                <NavLink href="/" onClick={closeMenu}>
                  Home
                </NavLink>

                <NavLink href="/tools" onClick={closeMenu}>
                  Tools
                </NavLink>

                <NavLink href="/pricing" onClick={closeMenu}>
                  Pricing
                </NavLink>

                <NavLink href="/lawyer" onClick={closeMenu}>
                  Lawyer Workspace
                </NavLink>

  

              <NavLink href="/about" onClick={closeMenu}>
                  About Us
                </NavLink>  

                <NavLink href="/contact" onClick={closeMenu}>
                  Contact Us
                </NavLink>
              </nav>

              <div className="my-4 h-px bg-slate-100" />

              {/* LOGGED OUT */}
              <Show when="signed-out">
                <div className="flex flex-col gap-2">
                  <Link
                    href="/sign-in"
                    onClick={closeMenu}
                    className="flex h-11 items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Login
                  </Link>

                  <Link
                    href="/sign-up"
                    onClick={closeMenu}
                    className="flex h-11 items-center justify-center rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-blue-600"
                  >
                    Get Started
                  </Link>
                </div>
              </Show>

              {/* LOGGED IN */}
              <Show when="signed-in">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <Link
                    href="/dashboard"
                    onClick={closeMenu}
                    className="text-sm font-semibold text-slate-800"
                  >
                    Dashboard
                  </Link>

                  <UserButton />
                </div>
              </Show>

            </div>
          </div>
        </>
      )}
    </div>
  );
}