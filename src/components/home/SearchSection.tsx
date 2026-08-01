import SearchBar from "@/components/searches/SearchBar";

export default function SearchSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-bold">
          Find your perfect AI Tool
        </h2>

        <p className="mt-4 text-gray-600">
          Search by profession, category or tool name.
        </p>

        <div className="mt-10">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}