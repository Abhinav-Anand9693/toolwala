import Link from "next/link";
import Logo from "../../common/Logo";

export default function NavLogo() {
  return (
    <Link
      href="/"
      aria-label="Toolwala Home"
      className="flex shrink-0 items-center"
    >
      <Logo />
    </Link>
  );
}