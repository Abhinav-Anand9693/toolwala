import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4 py-16">
      <SignUp />
    </main>
  );
}