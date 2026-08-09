import Link from "next/link";
import {
  FaGithub as Github,
  FaTwitter as Twitter,
  FaLinkedin as Linkedin,} from "react-icons/fa";
import {
  ArrowUpRight
 
} from "lucide-react";

const productLinks = [
  { label: "All Tools", href: "/tools" },
  { label: "AI Tools", href: "/tools" },
  { label: "Developer Tools", href: "/profession/developer" },
  { label: "Pricing", href: "/pricing" },
];

const companyLinks = [
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Careers", href: "#" },
];

const legalLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Security", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-slate-950"
            >
              Toolwala
            </Link>

            <p className="mt-4 max-w-sm leading-7 text-slate-500">
              Your professional AI workspace for getting
              everyday work done faster.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
              >
                <Github className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
              >
                <Twitter className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <FooterColumn
            title="Product"
            links={productLinks}
          />

          {/* Company */}
          <FooterColumn
            title="Company"
            links={companyLinks}
          />

          {/* Legal */}
          <FooterColumn
            title="Legal"
            links={legalLinks}
          />
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col gap-4 border-t border-slate-200 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Toolwala. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            Built for people who get things done.
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
};

function FooterColumn({
  title,
  links,
}: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-950">
        {title}
      </h3>

      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-slate-500 transition hover:text-slate-950"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}