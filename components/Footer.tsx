"use client";
import { Heart, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { HiOutlineMail } from "react-icons/hi";
import { LuGithub } from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import { MdOutlineFileDownload } from "react-icons/md";
import { useThemeToggle } from "@/hooks/useThemeToggle";

export const Footer = () => {
  const { isLightMode, toggleToLightMode, toggleToDarkMode } = useThemeToggle();

  return (
    <div className=" w-full px-5 py-1   mx-auto text-[14px]  border-t-[1px] border-[#00000014] dark:border-[#ffffff24] ">
      <div className="wrapper mx-auto flex justify-between items-center">
        <div className="hidden sm:flex justify-center items-center gap-1 text-[#666]  text-[10px] sm:text-sm lg:text-base">
          <p>Made with Next</p>
          <div>
            {" "}
            <Heart className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4  " />{" "}
          </div>
        </div>

        <div className="flex justify-center items-center  text-[#666]">
          <ul className="flex gap-4  md:gap-6 lg:gap-8">
            <li className=" flex items-center ">
              <Link
                href="https://www.linkedin.com/in/cattaneo-diego"
                target="_blank"
                rel="noreferrer"
                className="flex items-center"
              >
                <RiLinkedinLine className="w-4 h-4  lg:w-5 lg:h-5 " />
              </Link>
            </li>

            <li className=" flex items-center">
              <Link
                href="https://github.com/dcattaneo"
                target="_blank"
                rel="noreferrer"
                className="flex items-center"
              >
                <LuGithub className="w-4 h-4  lg:w-5 lg:h-5  " />
              </Link>
            </li>

            <li className=" flex items-center ">
              <Link
                href="mailto:cattaneo64801@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center "
              >
                <HiOutlineMail className="w-4 h-4  lg:w-5 lg:h-5  " />
              </Link>
            </li>

            <li className=" flex items-center">
              <Link
                href="/CV_Cattaneo_Diego.pdf"
                download="CV_Cattaneo_Diego.pdf"
                target="_blank"
                className="flex items-center "
              >
                <MdOutlineFileDownload className="w-4 h-4  lg:w-5 lg:h-5" />
              </Link>
            </li>
          </ul>
        </div>

        <div
          className={`border rounded-full flex justify-center items-center  border-[#00000014]  dark:border-wrapper-dark`}
        >
          <div className="flex  p-1 gap-1">
            <div
              className={`flex rounded-full  w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] lg:w-[32px] lg:h-[32px]  justify-center items-center ${
                isLightMode ? "bg-[#00000014]" : "opacity-50"
              }`}
            >
              <button onClick={toggleToLightMode} disabled={isLightMode}>
                {" "}
                <Sun className="w-4 h-4  lg:w-5 lg:h-5 opacity-70 dark:text-[#fff] dark:opacity-100" />
              </button>
            </div>

            <div
              className={`flex rounded-full  w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] lg:w-[32px] lg:h-[32px]    justify-center items-center ${
                !isLightMode ? "bg-button-dark" : "opacity-50"
              }`}
            >
              <button onClick={toggleToDarkMode} disabled={!isLightMode}>
                <Moon className="w-4 h-4  lg:w-5 lg:h-5 opacity-70 " />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
