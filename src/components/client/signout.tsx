"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      redirect: false,
    });
    router.push("/login");
  };

  return (
    <button
      onClick={handleSignOut}
      className="flex h-9 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-violet-500 to-indigo-600 px-4 text-sm font-medium text-white shadow-md transition-all duration-300 hover:from-violet-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <FiLogOut className="h-4 w-4" />
      Logout
    </button>
  );
}