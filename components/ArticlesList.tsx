import React from "react";
import { ArticleCard } from "./index";

export type ArticleCardType = {
  _createdAt: string;
  views: number;
  author: { _id: number; name: string; image: string; bio: string };
  _id: number;
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
  // console.log("ArticlesListPosts", posts);
  return (
    <>
      <section className="section_container bg-red-200">
        <p className="font-semibold text-2xl">
          {query ? `Search result for: ${query}` : "All Articles"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: ArticleCardType) => {
              return <ArticleCard key={post._id} post={post} />;
            })
          ) : (
            <p className="no-results">No articles found</p>
          )}
        </ul>
      </section>
    </>
  );
};
