import { currentUser } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const user = await currentUser();

  return (
    <div className="p-20">
      <h1 className="text-4xl font-bold">
        Welcome {user?.firstName}
      </h1>
    </div>
  );
}