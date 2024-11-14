import { formatDate } from "@/lib/utils";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArticleCardType } from "./ArticlesList";

export const ArticleCard = ({ post }: { post: ArticleCardType }) => {
  const {
    _createdAt,
    views,
    author: { _id: authorId, name, image: authorImage },
    _id,
    description,
    image,
    category,
    title,
  } = post;
  return (
    <li className="article-card group">
      <div className="flex-between">
        <div className="flex flex-col">
          <p className="font-semibold">{formatDate(_createdAt)}</p>
          <Link href={`/user/${authorId}`}>
            <p className=" line-clamp-1  font-light "> {name}</p>
          </Link>
        </div>
        <div className="flex gap-1.5 ">
          <Eye />
          <span className="">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5 ">
        <Link href={`/article/${_id}`}>
          <h3 className="font-semibold">{title}</h3>
        </Link>

        <Link href={`/user/${authorId}`}>
          <Image
            src={authorImage}
            alt="placeholder"
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/article/${_id}`}>
        <p className="article-card_description">{description}</p>
        <img src={image} alt="article-image" className="article-card_image" />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category.toLowerCase()}`}>
          <p className="font-semibold">{category}</p>
        </Link>
        <Button asChild className="">
          <Link href={`/article/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};
