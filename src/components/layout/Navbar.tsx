"use client";

import Container from "./Container";
import NavLogo from "@/components/layout/navbar/NavLogo";
import NavLink from "@/components/layout/navbar/NavLinks";
import MobileMenu from "@/components/layout/navbar/MobileMenu";
import NavActions from "./NavActions";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          {/* LOGO */}
          <NavLogo />

          {/* DESKTOP NAVIGATION */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-8 lg:flex"
          >
            <NavLink href="/">
              Home
            </NavLink>

            <NavLink href="/tools">
              Tools
            </NavLink>

            <NavLink href="/pricing">
              Pricing
            </NavLink>

          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            {/* DESKTOP ACTIONS */}
            <NavActions />

            {/* MOBILE MENU */}
            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}