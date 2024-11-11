import { Suspense } from "react";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { ARTICLE_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import { View } from "@/components/index";

// export const experimental_ppr = true;

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
  const articleData: ArticlePageType = await client.fetch(ARTICLE_BY_ID_QUERY, {
    id,
  });
  // console.log("articleData:", articleData);

  if (!articleData) return notFound();
  const {
    title,
    category,
    post,
    image,
    description,
    views,
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
      <section className="section_container bg-red-200 !min-h-[230px]">
        <p className="tag flex items-center justify-center">
          {formatDate(_createdAt)}
        </p>
        <h1 className="heading">{title}</h1>
        <p className="sub-heading !max-w-5xl">{description}</p>
      </section>

      <section className="section_container">
        <img
          src={image}
          alt="articleImage"
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto bg-red-200">
          <div className="flex justify-between items-center ">
            <Link
              href={`/user/${authorId}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={image}
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

        <hr className="divider" />

        {/* Selected Articles */}
      </section>

      {/* dynamic section */}
      <Suspense fallback={<Skeleton className="view_skeleton" />}>
        <View id={_id} />
      </Suspense>
    </>
  );
};

export default ArticlePage;
