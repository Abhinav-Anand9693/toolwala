import Container from "@/components/layout/Container";

export default function HomePage() {
  return (
    <Container>
      <section className="py-24 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight">
          Professional AI Workspace
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Discover AI tools based on your profession, not by file type.
        </p>
      </section>
    </Container>
  );
}