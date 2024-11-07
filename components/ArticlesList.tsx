import React from "react";
import { ArticleCard } from "./index";

export const ArticlesList = ({ query }: { query?: string }) => {
  const POSTS = [
    {
      _createdAt: new Date(),
      views: 55,
      author: {
        _id: 1,
        name: "Lucas",
      },
      _id: 1,
      description: "This in an example",
      image:
        "https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Winter",
      title: "Blog N° 1",
    },
    {
      _createdAt: new Date(),
      views: 55,
      author: {
        _id: 2,
        name: "Robert",
      },
      _id: 2,
      description: "This in an example",
      image:
        "https://images.unsplash.com/photo-1606901300018-10dafd493f97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Winter",
      title: "Blog N°2 ",
    },
    {
      _createdAt: new Date(),
      views: 55,
      author: {
        _id: 3,
        name: "Diego",
      },
      _id: 3,
      description: "This in an example",
      image:
        "https://images.unsplash.com/photo-1594583388647-364ea6532257?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Winter",
      title: "Blog N° 3",
    },
  ];

  type ArticleCardType = {
    _createdAt: string;
    views: number;
    author: { _id: number; name: string };
    _id: number;
    description: string;
    image: string;
    category: string;
    title: string;
  };

  return (
    <>
      <section className="section_container bg-red-200">
        <p className="font-semibold text-2xl">
          {query ? `Search result for: ${query}` : "All Articles"}
        </p>

        <ul className="mt-7 card_grid">
          {POSTS?.length > 0 ? (
            POSTS.map((post: ArticleCardType, index: number) => {
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
