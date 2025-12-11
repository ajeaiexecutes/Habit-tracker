"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  async function handleLogout() {
    await signOut({ redirect: false });
    router.push("/login");
  }

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-xl text-black">
        A B I T O
      </Link>

      <div className="flex gap-4">
        {!session && (
          <>
            <Link href="/login" className="text-black">Login</Link>
          </>
        )}

        {session && (
          <>
            <button
              onClick={handleLogout}
              className="text-black border p-2 font-semibold hover:text-red-500"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
