import { Hero } from "@/components/index";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams)?.query;
  console.log("query2:", query);
  return (
    <>
      <Hero query={query} />
    </>
  );
}
