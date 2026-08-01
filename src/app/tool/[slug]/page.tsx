import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import ToolHeader from "@/components/tool/ToolHeader";
import ToolWorkspace from "@/components/tool/ToolWorkspace";
import RelatedTools from "@/components/tool/RelatedTools";
import { getToolBySlug } from "@/lib/toolRegistry";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;

  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return (
    <Container>
      <section className="py-20">
        <ToolHeader tool={tool} />

        <ToolWorkspace />

        <RelatedTools />
      </section>
    </Container>
  );
}