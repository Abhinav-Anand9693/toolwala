import Container from "@/components/layout/Container";

export default function SearchSection() {
  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold">
            Search by Task
          </h2>

          <p className="mt-4 text-gray-600">
            Describe what you want to accomplish.
          </p>

          <div className="mt-8 flex gap-3">
            <input
              type="text"
              placeholder='Try "Create Resume"'
              className="flex-1 rounded-lg border px-4 py-3"
            />

            <button className="rounded-lg bg-black px-6 py-3 text-white">
              Search
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}