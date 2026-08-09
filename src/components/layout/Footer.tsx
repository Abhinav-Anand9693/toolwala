import Link from "next/link";
import {
  FaGithub as Github,
  FaLinkedin as Linkedin,
  FaTwitter as Twitter }
  from "react-icons/fa";

  import { ArrowUpRight 
  
} from "lucide-react";

const productLinks = [
  {
    label: "All Tools",
    href: "/tools",
  },
  {
    label: "AI Tools",
    href: "/tools?type=ai",
  },
  {
    label: "Developer Tools",
    href: "/profession/developer",
  },
  {
    label: "Categories",
    href: "/tools",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
];

const companyLinks = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Careers",
    href: "/careers",
  },
];

const resourceLinks = [
  {
    label: "Help Center",
    href: "/help",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
  {
    label: "Tool Directory",
    href: "/tools",
  },
];

const legalLinks = [
  {
    label: "Privacy Policy",
    href: "/privacy",
  },
  {
    label: "Terms of Service",
    href: "/terms",
  },
  {
    label: "Cookie Policy",
    href: "/cookies",
  },
  {
    label: "Security",
    href: "/security",
  },
  {
    label: "Refund Policy",
    href: "/refunds",
  },
  {
    label: "Accessibility",
    href: "/accessibility",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">

          {/* Brand */}
          <div>

            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-slate-950"
            >
              Toolwala
            </Link>

            <p className="mt-4 max-w-sm leading-7 text-slate-500">
              Your professional AI workspace for productivity,
              developer, business, career and everyday tools.
            </p>

            <div className="mt-6 flex gap-3">

              <SocialLink
                href="https://github.com/"
                label="GitHub"
              >
                <Github className="h-4 w-4" />
              </SocialLink>

              <SocialLink
                href="https://linkedin.com/"
                label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </SocialLink>

              <SocialLink
                href="https://x.com/"
                label="X"
              >
                <Twitter className="h-4 w-4" />
              </SocialLink>

            </div>

          </div>

          <FooterColumn
            title="Product"
            links={productLinks}
          />

          <FooterColumn
            title="Company"
            links={companyLinks}
          />

          <FooterColumn
            title="Resources"
            links={resourceLinks}
          />

          <FooterColumn
            title="Legal"
            links={legalLinks}
          />

        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-slate-200 pt-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">

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

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-950">
        {title}
      </h3>

      <ul className="mt-5 space-y-3">

        {links.map((link) => (
          <li key={link.href}>
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

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
    >
      {children}
    </a>
  );
}