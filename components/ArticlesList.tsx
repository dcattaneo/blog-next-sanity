import React from "react";
import { ArticleCard } from "./index";

export type ArticleCardType = {
  _createdAt: string;
  views: number;
  author: { _id: string; name: string; image: string; bio: string };
  _id: string;
  description: string;
  image: string;
  category: string;
  title: string;
};

export const ArticlesList = ({
  query,
  posts,
}: {
  query?: string;
  posts: ArticleCardType[];
}) => {
  return (
    <>
      <section className="section_container ">
        <p className="font-bold text-3xl text-gradient dark:text-gradient-dark  pb-4">
          {query ? `Search result for: ${query}` : "All Articles"}
        </p>

        <ul className="mt-7 card_grid min-h-[200px] sm:min-h-[300px] ">
          {posts?.length > 0 ? (
            posts.map((post: ArticleCardType) => {
              return <ArticleCard key={post._id} post={post} />;
            })
          ) : (
            <p className="font-bold text-2xl dark:text-gradient-dark  ">
              No articles found
            </p>
          )}
        </ul>
      </section>
    </>
  );
};
