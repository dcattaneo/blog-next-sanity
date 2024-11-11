import { auth } from "@/auth";
import { ArticleForm } from "@/components/index";
import { redirect } from "next/navigation";

const CreateArticlePage = async () => {
  const session = await auth();

  if (!session) redirect("/");
  return (
    <>
      <section className="section_container !min-h-[230px] bg-red-200">
        <h1 className="heading">Create your Article</h1>
      </section>
      <ArticleForm />
    </>
  );
};

export default CreateArticlePage;
