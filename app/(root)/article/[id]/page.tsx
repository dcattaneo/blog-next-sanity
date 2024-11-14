import { Suspense } from "react";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import {
  ARTICLE_BY_ID_QUERY,
  RELATED_ARTICLES_BY_SLUG,
} from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import { ArticleCard, View } from "@/components/index";
import { ArticleCardType } from "@/components/ArticlesList";

export const experimental_ppr = true;

export type ArticlePageType = {
  title: string;
  category: string;
  post: string;
  image: string;
  description: string;
  views: number;
  _createdAt: string;
  _id: string;
  author: {
    _id: string;
    name: string;
    image: string;
    bio: string;
    username: string;
  };
};

const ArticlePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // ----Sequential data fetching (articleData as independent one)----

  // const articleData: ArticlePageType = await client.fetch(ARTICLE_BY_ID_QUERY, {
  //   id,
  // });
  // console.log("articleData:", articleData);

  // ----Sequential data fetching (relatedArticles as independent one)----

  // const { select: relatedArticles } = await client.fetch(
  //   RELATED_ARTICLES_BY_SLUG,
  //   { slug: "related-articles" }
  // );

  // console.log("relatedArticles:", relatedArticles);

  //---- Parallel data fetching (both articleData and relatedArticles)----

  const [articleData, { select: relatedArticles }] = await Promise.all([
    client.fetch<ArticlePageType>(ARTICLE_BY_ID_QUERY, {
      id,
    }),
    client.fetch(RELATED_ARTICLES_BY_SLUG, { slug: "related-articles" }),
  ]);

  console.log("articleData:", articleData);
  console.log("relatedArticles:", relatedArticles);

  if (!articleData) return notFound();

  const filteredRelatedArticles = relatedArticles?.filter(
    (article: ArticleCardType) => article._id !== articleData._id
  );

  const {
    title,
    category,
    post,
    image,
    description,
    // views,
    _createdAt,
    _id,
    author: {
      _id: authorId,
      name: authorName,
      image: authorImage,
      bio: authorBio,
      username: authorUsername,
    },
  } = articleData;

  const markdown = markdownit();
  const parsedMarkdown = markdown.render(post) || "";
  return (
    <>
      <section className="section_container bg-slate-500 !min-h-[230px]   ">
        <p className="tag flex items-center justify-center">
          {formatDate(_createdAt)}
        </p>
        <div className="flex flex-col justify-center items-center  max-w-7xl ">
          <h1 className="heading overflow-hidden">{title}</h1>
          <p className="sub-heading !max-w-4xl">{description}</p>
        </div>
      </section>

      <section className="sub-section_container ">
        <img
          src={image}
          alt="articleImage"
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5  mt-10 max-w-4xl mx-auto">
          <div className="flex justify-between items-center ">
            <Link
              href={`/user/${authorId}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={authorImage}
                alt="avatarImage"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg "
              />
              <div>
                <p className="font-medium text-[20px] text-black ">
                  {authorName}
                </p>
                <p>@{authorUsername}</p>
                <p className="text-sm"> {authorBio}</p>
              </div>
            </Link>
            <p className="category-tag">{category}</p>
          </div>
          <h3 className="text-[30px] font-bold text-black">Article Details </h3>
          {parsedMarkdown && (
            <article
              className="max-w-4xl  break-all "
              dangerouslySetInnerHTML={{ __html: parsedMarkdown }}
            />
          )}
        </div>

        <hr className="divider " />

        {/* Related Articles */}
        {filteredRelatedArticles?.length > 0 && (
          <div className="max-w-4xl mx-auto ">
            <p className="font-semibold text-[20px]">Related Articles</p>
            <ul className="mt-7 card_grid-sm">
              {filteredRelatedArticles.map((article: ArticleCardType) => (
                <ArticleCard key={article._id} post={article} />
              ))}
            </ul>
          </div>
        )}

        {/* dynamic section */}
        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={_id} />
        </Suspense>
      </section>
    </>
  );
};

export default ArticlePage;
