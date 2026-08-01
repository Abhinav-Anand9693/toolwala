type ProfessionHeaderProps = {
  title: string;
};

export default function ProfessionHeader({
  title,
}: ProfessionHeaderProps) {
  return (
    <section className="border-b py-12">
      <h1 className="text-4xl font-bold">
        {title}
      </h1>

      <p className="mt-3 text-gray-600">
        Discover the best tools for your profession.
      </p>
    </section>
  );
}