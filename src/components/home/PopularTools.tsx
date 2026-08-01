import Container from "@/components/layout/Container";
import { tools } from "@/config/tools";

export default function PopularTools() {
  return (
    <section className="py-24">
      <Container>
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Popular Tools
          </h2>

          <p className="mt-4 text-gray-600">
            Start with the tools our users love the most.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="rounded-xl border p-6 transition hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold">
                {tool.title}
              </h3>

              <p className="mt-3 text-sm text-gray-600">
                {tool.description}
              </p>

              <span className="mt-4 inline-block rounded bg-gray-100 px-3 py-1 text-xs">
                {tool.category}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}