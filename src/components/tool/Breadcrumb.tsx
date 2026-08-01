import Link from "next/link";

type Props = {
  profession: string;
  title: string;
};

export default function Breadcrumb({
  profession,
  title,
}: Props) {
  return (
    <nav className="mb-6 text-sm text-gray-500">
      <Link href="/">Home</Link>

      {" / "}

      <Link href={`/profession/${profession}`}>
        {profession}
      </Link>

      {" / "}

      <span>{title}</span>
    </nav>
  );
}