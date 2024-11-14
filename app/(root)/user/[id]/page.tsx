import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import { UserArticles } from "@/components/index";
import { Suspense } from "react";
import { ArticleCardSkeleton } from "@/components/index";

type UserProfileType = {
  username: "string";
  email: "string";
  image: "string";
  bio: "string";
  _id: "string";
  id: number;
  name: "string";
};

export const experimental_ppr = true;

const UserProfile = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log("ParamsId:", id);
  const session = await auth();
  console.log("sessionId:", session?.id);

  const user: UserProfileType = await client.fetch(AUTHOR_ID_QUERY, { id });
  console.log("user:", user);

  if (!user) return notFound();

  return (
    <>
      <section className="section_container">
        {/* Profile Card Wrapper */}
        <div className="flex  justify-center sm:justify-start mb-10 ">
          <div className="profile-card text-center ">
            <div className="title">
              <h3 className="text-lg line-clamp-1 font-bold">{user.name}</h3>
            </div>
            <Image
              src={user.image}
              alt={user.name}
              width={180}
              height={180}
              className="rounded-full"
            />
            <p className="italic">
              {" "}
              <span className="font-semibold text-black"> @</span>
              {user.username}
            </p>
            <p className="italic"> {user.bio} </p>
          </div>
        </div>
        {/* Articles details */}
        <div className="flex flex-1 flex-col gap-5  ">
          <p className="font-bold text-[20px] sm:text-2xl text-center sm:text-start">
            {session?.id === user._id ? "Your" : "All"} Articles
          </p>

          <ul className="card_grid-sm">
            {/* ppr - Suspense */}
            <Suspense fallback={<ArticleCardSkeleton />}>
              {/* Add User Articles */}
              <UserArticles id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
