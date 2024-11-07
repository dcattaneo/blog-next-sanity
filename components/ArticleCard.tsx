import { formatDate } from "@/lib/utils";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

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

export const ArticleCard = ({ post }: { post: ArticleCardType }) => {
  const {
    _createdAt,
    views,
    author: { _id: authorId, name },
    _id,
    description,
    image,
    category,
    title,
  } = post;
  return (
    <li className="article-card group">
      <div className="flex-between">
        <p>{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <Eye />
          <span>{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${authorId}`}>
            <p className=" line-clamp-1">{name}</p>
          </Link>
          <Link href={`/article/${_id}`}>
            <h3 className="font-semibold">{title}</h3>
          </Link>
        </div>

        <Link href={`/user/${authorId}`}>
          <Image
            src="https://placehold.co/48x48"
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
        <Button asChild>
          <Link href={`/article/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};
