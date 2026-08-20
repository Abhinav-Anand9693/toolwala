import CaseForm from "@/components/lawyer/CaseForm";

export default function NewCasePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold text-blue-600">
            LAWYER WORKSPACE
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Create New Case
          </h1>

          <p className="mt-2 text-slate-600">
            Add the details of your case to your workspace.
          </p>
        </div>

        <CaseForm />
      </div>
    </main>
  );
}