import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth, signOut, signIn } from "@/auth";

export const Navbar = async () => {
  const session = await auth();
  return (
    <header
      className="px-5 py-3 shadow-sm bg-black
    "
    >
      <nav className="flex justify-between items-center">
        <Link href="/">
          {/* Add Logo.png */}
          <Image src="/vercel.svg" alt="Logo" width={30} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-white">
          {session && session?.user ? (
            <>
              {/* add route */}
              <Link href="/">
                <span>Create</span>
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span>Logout</span>
                </button>
              </form>

              {/* add route */}
              <Link href="/">
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Login </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};
