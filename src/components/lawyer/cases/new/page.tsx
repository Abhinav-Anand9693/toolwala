import CaseForm from "@/components/lawyer/CaseForm";

export default function NewCasePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-3xl">

        <div className="mb-8">

          <p className="text-sm font-semibold text-blue-600">
            Lawyer Workspace
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Create New Case
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Add the basic information about your case.
          </p>

        </div>

        <CaseForm />

      </div>

    </main>
  );
}