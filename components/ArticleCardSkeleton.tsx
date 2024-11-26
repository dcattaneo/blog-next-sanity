import { Skeleton } from "./ui/skeleton";

export const ArticleCardSkeleton = () => {
  return (
    <>
      {[0, 1, 2, 3].map((index: number) => (
        <li key={index}>
          <Skeleton className="w-full h-96 rounded-[22px] bg-[#00000014] dark:bg-[#111] dark:border dark:border-solid dark:border-[#333]" />
        </li>
      ))}
    </>
  );
};
