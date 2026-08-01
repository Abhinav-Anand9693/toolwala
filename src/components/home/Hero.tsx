import Container from "@/components/layout/Container";

export default function Hero() {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <span className="rounded-full border px-4 py-2 text-sm font-medium">
            🚀 AI-Powered Professional Workspace
          </span>

          <h1 className="mt-8 text-5xl font-extrabold tracking-tight md:text-7xl">
            What do you want to accomplish today?
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Toolwala helps professionals discover the right tools and AI workflows
            based on their work—not just file types.
          </p>
        </div>
      </Container>
    </section>
  );
}