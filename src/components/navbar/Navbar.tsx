"use client";

import {
  Show,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="text-xl font-bold">
          Toolwala
        </div>

        {/* Authentication */}
        <div className="flex items-center gap-4">

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="rounded-xl border px-4 py-2 font-medium">
                Login
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <UserButton />
          </Show>

        </div>

      </div>
    </nav>
  );
}