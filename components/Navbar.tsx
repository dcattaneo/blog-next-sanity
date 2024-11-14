import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth, signOut, signIn } from "@/auth";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = async () => {
  const session = await auth();

  return (
    <header
      className="px-5 py-3 shadow-sm bg-slate-800
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
              {/* Desktop */}
              <div className="hidden md:flex justify-center items-center gap-2 relative">
                <Link href={`/user/${session?.id}`} className="relative group">
                  <Image
                    src={session?.user.image || "https://i.pravatar.cc/300"}
                    alt={session?.user.name || ""}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  {/* Tooltip */}
                  <span className="absolute left-1/2 -translate-x-1/2  mb-2 w-max px-2 py-1 bg-gray-600 text-white text-xs rounded opacity-0   group-hover:opacity-100 transition-opacity">
                    {session?.user?.name}
                  </span>
                </Link>
              </div>
              <Link href="/article/create" className="hidden md:flex">
                <span>Create</span>
              </Link>

              <form
                className="hidden md:flex"
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span>Logout </span>
                </button>
              </form>

              {/* Mobile */}
              <div className="flex md:hidden items-center gap-2">
                <Link href={`/user/${session?.id}`}>
                  <Image
                    src={session?.user.image || "https://i.pravatar.cc/300"}
                    alt={session?.user.name || ""}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <ChevronDown />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent  >
                    <DropdownMenuItem className=" items-center justify-center">
                      <Link href={`/user/${session?.id}`}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="items-center justify-center">
                      <Link href="/article/create" className="">
                        <span>Create</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="items-center justify-center">
                      {" "}
                      <form
                        action={async () => {
                          "use server";
                          await signOut({ redirectTo: "/" });
                        }}
                      >
                        <button type="submit">
                          <span>Logout </span>
                        </button>
                      </form>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
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
