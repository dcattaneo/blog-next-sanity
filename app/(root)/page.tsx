import { ArticlesList, Hero } from "@/components/index";
import { client } from "@/sanity/lib/client";
import { ARTICLES_QUERY } from "@/sanity/lib/queries";
// import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams)?.query;

  //--- ARTICLES_QUERY FROM SANITY_QUERIES---
  const posts = await client.fetch(ARTICLES_QUERY);

  console.log("Sanity-Posts", posts);

  // --- FETCH DIRECTLY FROM SANITY REVALIDATING THE PAGE WHENEVER NEW CHANGES ARE MADE---

  // const { data: posts } = await sanityFetch({ query: ARTICLES_QUERY });
  // console.log("Sanity-FETCH", posts);
  return (
    <>
      <Hero query={query} />
      <ArticlesList query={query} posts={posts} />
      {/* <SanityLive />{" "} */}
      {/*  Sanity is live with automatic revalidation of published content */}
    </>
  );
}
