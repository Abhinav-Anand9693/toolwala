import Link from "next/link";
import Container from "./Container";
import Logo from "../common/Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">

          {/* Left */}

          <div className="flex items-center gap-10">

            <Logo />

            <nav className="hidden md:flex items-center gap-6">

              <Link
                href="/tools"
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Explore Tools
              </Link>

              <Link
                href="/categories"
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Categories
              </Link>

              <Link
                href="/pricing"
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Pricing
              </Link>

            </nav>

          </div>

          {/* Right */}

          <div className="flex items-center gap-4">

            <button className="text-sm font-medium hover:text-blue-600">
              Login
            </button>

            <button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition">
              Get Started
            </button>

          </div>

        </div>
      </Container>
    </header>
  );
}