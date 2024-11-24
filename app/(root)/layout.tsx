import { Navbar } from "@/components/index";
import { Footer } from "@/components/index";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-sans  text-custom-light bg-[rgb(250,250,250)] dark:bg-black ">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
