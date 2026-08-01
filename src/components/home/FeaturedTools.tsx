import { tools } from "@/config/tools";
import ToolCard from "@/components/tool/ToolCard";
import Container from "@/components/layout/Container";

export default function FeaturedTools() {
  return (
    <section className="py-20">
      <Container>
        <h2 className="mb-10 text-3xl font-bold">
          Featured Tools
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tools.slice(0, 4).map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </Container>
    </section>
  );
}