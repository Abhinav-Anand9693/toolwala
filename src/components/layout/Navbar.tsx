import Link from "next/link";
import Container from "./Container";
import Logo from "../common/Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">

          <Link href="/">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">

            <Link
              href="/"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Home
            </Link>

            <Link
              href="/tools"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Tools
            </Link>

            <Link
              href="/pricing"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Pricing
            </Link>

          </nav>

          <div className="flex items-center gap-3">

            <Link
              href="/sign-in"
              className="hidden rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:inline-flex"
            >
              Login
            </Link>

            <Link
              href="/sign-up"
              className="inline-flex items-center rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Get Started
            </Link>

          </div>

        </div>
      </Container>
    </header>
  );
}