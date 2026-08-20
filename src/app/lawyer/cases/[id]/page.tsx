import CaseDetails from "@/components/lawyer/CaseDetails";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CaseDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <CaseDetails caseId={id} />
      </div>
    </main>
  );
}