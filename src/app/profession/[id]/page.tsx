import Container from "@/components/layout/Container";
import ProfessionHeader from "@/components/profession/ProfessionHeader";
import ProfessionToolGrid from "@/components/profession/ProfessionToolGrid";
import { getToolsByProfession } from "@/lib/profession";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProfessionPage({
  params,
}: Props) {
  const { id } = await params;

  const professionTools =
    getToolsByProfession(id);

  return (
    <Container>
      <ProfessionHeader
        title={id}
      />

      <div className="py-10">
        <ProfessionToolGrid
          tools={professionTools}
        />
      </div>
    </Container>
  );
}