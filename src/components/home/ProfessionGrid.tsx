import Container from "@/components/layout/Container";
import { professions } from "@/config/professions";

export default function ProfessionGrid() {
  return (
    <section className="py-24">
      <Container>
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Choose Your Profession
          </h2>

          <p className="mt-4 text-gray-600">
            Discover AI tools built for your profession.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {professions.map((profession) => (
            <div
              key={profession.id}
              className="rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-5xl">
                {profession.icon}
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                {profession.title}
              </h3>

              <p className="mt-3 text-sm text-gray-600">
                {profession.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}