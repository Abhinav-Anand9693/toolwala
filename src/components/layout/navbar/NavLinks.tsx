"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export default function NavLink({
  href,
  children,
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();

  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative py-2 text-sm font-medium transition ${
        isActive
          ? "text-slate-950"
          : "text-slate-600 hover:text-slate-950"
      }`}
    >
      {children}

      <span
        className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-slate-950 transition-all ${
          isActive ? "w-full" : "w-0"
        }`}
      />
    </Link>
  );
}