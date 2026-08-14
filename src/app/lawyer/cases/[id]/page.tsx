import CaseDetails from "@/components/lawyer/CaseDetails";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CasePage({
  params,
}: PageProps) {
  const { id } = await params;

  return <CaseDetails caseId={id} />;
}