import { ArticlesList, Hero } from "@/components/index";
import { client } from "@/sanity/lib/client";
import { ARTICLES_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams)?.query;
  const params = { search: query || null };

  const session = await auth();

  // console.log("sessionId:", session?.id);

  //--- ARTICLES_QUERY FROM SANITY_QUERIES---
  // const posts = await client.fetch(ARTICLES_QUERY, params);

  // console.log("Sanity-Posts", posts);

  // --- FETCH DIRECTLY FROM SANITY REVALIDATING THE PAGE WHENEVER NEW CHANGES ARE MADE---

  const { data: posts } = await sanityFetch({ query: ARTICLES_QUERY, params });
  console.log("Sanity-FETCH", posts);
  return (
    <>
      <Hero query={query} />
      <ArticlesList query={query} posts={posts} />
      <SanityLive />{" "}
      {/*  Sanity is live with automatic revalidation of published content */}
    </>
  );
}
