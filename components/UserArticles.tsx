import { client } from "@/sanity/lib/client";
import { ARTICLES_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import { ArticleCardType } from "./ArticlesList";
import { ArticleCard } from "@/components/index";

export const UserArticles = async ({ id }: { id: string }) => {
  const articles = await client.fetch(ARTICLES_BY_AUTHOR_QUERY, { id });

  console.log("userArticles:", articles);

  return (
    <>
      {articles.length > 0 ? (
        articles.map((article: ArticleCardType) => {
          return <ArticleCard key={article._id} post={article} />;
        })
      ) : (
        <p className="text-black text-sm font-normal">No Articles Yet</p>
      )}
    </>
  );
};
