import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="not_found_container">
      <h1 className="heading  text-4xl font-bold text-gradient dark:text-gradient-dark">
        404 - Page Not Found
      </h1>
      <p className="sub-heading font-normal mt-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" className="mt-6 px-6 py-2  ">
        <Button className="bg-custom-light  shadow-none hover:bg-[#00000014] dark:bg-[#0a0a0a] dark:text-white dark:hover:bg-[#ffffff17] dark:bg-[#4e4c4c14] dark:border-[#ffffff24] ">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
