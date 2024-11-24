"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ChevronDown, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { RiGithubFill } from "react-icons/ri";

interface ClientNavbarProps {
  session: {
    user?: { name?: string | null; image?: string | null };
    id?: string;
  } | null;
  handleSignOut: () => Promise<void>;
  handleSignIn: () => Promise<void>;
}

export const ClientNavbar: React.FC<ClientNavbarProps> = ({
  session,
  handleSignOut,
  handleSignIn,
}) => {
  return (
    <header
      className={`px-5 py-3 shadow-sm  bg-white  border-b-[1px] border-[#00000014] fixed w-full z-20 dark:bg-black  dark:border-[#ffffff24]`}
    >
      <nav className="flex justify-between items-center">
        <Link href="/">
          <svg
            className="w-6 h-6 lg:w-7 lg:h-7 text-[#0a0a0a] opacity-85 dark:text-[#eaeaea] dark:opacity-90"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            role="img"
          >
            <g>
              <path d="M421.073,221.719c-0.578,11.719-9.469,26.188-23.797,40.094v183.25c-0.016,4.719-1.875,8.719-5.016,11.844 c-3.156,3.063-7.25,4.875-12.063,4.906H81.558c-4.781-0.031-8.891-1.844-12.047-4.906c-3.141-3.125-4.984-7.125-5-11.844V152.219 c0.016-4.703,1.859-8.719,5-11.844c3.156-3.063,7.266-4.875,12.047-4.906h158.609c12.828-16.844,27.781-34.094,44.719-49.906 c0.078-0.094,0.141-0.188,0.219-0.281H81.558c-18.75-0.016-35.984,7.531-48.25,19.594c-12.328,12.063-20.016,28.938-20,47.344 v292.844c-0.016,18.406,7.672,35.313,20,47.344C45.573,504.469,62.808,512,81.558,512h298.641c18.781,0,36.016-7.531,48.281-19.594 c12.297-12.031,20-28.938,19.984-47.344V203.469c0,0-0.125-0.156-0.328-0.313C440.37,209.813,431.323,216.156,421.073,221.719z"></path>
              <path d="M498.058,0c0,0-15.688,23.438-118.156,58.109C275.417,93.469,211.104,237.313,211.104,237.313 c-15.484,29.469-76.688,151.906-76.688,151.906c-16.859,31.625,14.031,50.313,32.156,17.656 c34.734-62.688,57.156-119.969,109.969-121.594c77.047-2.375,129.734-69.656,113.156-66.531c-21.813,9.5-69.906,0.719-41.578-3.656 c68-5.453,109.906-56.563,96.25-60.031c-24.109,9.281-46.594,0.469-51-2.188C513.386,138.281,498.058,0,498.058,0z"></path>
            </g>
          </svg>
        </Link>

        <div className="flex items-center gap-5 text-black">
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
                  <span className="absolute left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-custom-dark dark:bg-gray-200 dark:text-black text-xs rounded opacity-0 group-hover:opacity-90 transition-opacity">
                    {session?.user?.name}
                  </span>
                </Link>
              </div>
              <Link
                href="/article/create"
                className="hidden md:flex rounded-lg"
              >
                <Button className="bg-custom-light  shadow-none hover:bg-[#00000014] dark:bg-[#0a0a0a] dark:text-white dark:hover:bg-[#ffffff17] dark:bg-[#4e4c4c14] dark:border-[#ffffff24] ">
                  Create
                </Button>
              </Link>

              <form className="hidden md:flex" action={handleSignOut}>
                <Button
                  type="submit"
                  className="bg-custom-dark dark:bg-custom-light  hover:opacity-85 hover:bg-[hsl(0, 0%, 9%)] "
                >
                  <LogOut style={{ width: "15px", height: "15px" }} />
                  Sign out
                </Button>
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
                    <ChevronDown className="text-black opacity-85 dark:text-white w-4 h-4 " />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=" dark:border-[#ffffff24] dark:bg-black ">
                    <DropdownMenuItem className=" justify-center dark:text-[#eaeaea]  ">
                      <Link href={`/user/${session?.id}`}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className=" dark:bg-[#ffffff24]" />
                    <DropdownMenuItem className="justify-center dark:text-[#eaeaea]">
                      <Link href="/article/create">
                        <span>Create</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className=" dark:bg-[#ffffff24]" />
                    <DropdownMenuItem className="justify-center dark:text-[#eaeaea]">
                      {" "}
                      <form action={handleSignOut}>
                        <button type="submit">
                          <span>Sign out </span>
                        </button>
                      </form>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          ) : (
            <form action={handleSignIn}>
              <Button
                className="bg-custom-dark dark:bg-custom-light  hover:opacity-85 hover:bg-[hsl(0, 0%, 9%)] flex flex-row justify-center items-center text-xs sm:text-sm  p-2 gap-2 sm:p-4 "
                
                type="submit"
              >
                Sign In
                <RiGithubFill style={{ width: "20px", height: "20px" }} />
              </Button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};
