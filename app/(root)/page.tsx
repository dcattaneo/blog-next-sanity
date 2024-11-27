import { ArticlesList, Hero } from "@/components/index";
// import { client } from "@/sanity/lib/client";
import { ARTICLES_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
// import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams)?.query;
  console.log("current-query: ", query);
  const params = { search: query || null };
  console.log("params:", params);

  // const session = await auth();

  // OPTION 1: --- ARTICLES_QUERY FROM SANITY_QUERIES ---
  // const posts = await client.fetch(ARTICLES_QUERY, params);

  // OPTION 2(current): --- FETCH DIRECTLY FROM SANITY, REVALIDATING THE PAGE WHENEVER NEW CHANGES ARE MADE ---

  const { data: posts } = await sanityFetch({ query: ARTICLES_QUERY, params });

  console.log("posts from query:", posts);

  return (
    <>
      <Hero query={query} />
      <ArticlesList query={query} posts={posts} />
      <SanityLive />{" "}
      {/*  Sanity is live with automatic revalidation of published content */}
    </>
  );
}
