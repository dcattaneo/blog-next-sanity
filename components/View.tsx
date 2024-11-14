import { LiveIndicator } from "@/components/index";
import { client } from "@/sanity/lib/client";
import { ARTICLE_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { unstable_after as after } from "next/server";

type articleViewsType = {
  views?: number | undefined;
};

export const View = async ({ id }: { id: string }) => {
  const { views: articleViews }: articleViewsType = await client.fetch(
    ARTICLE_VIEWS_QUERY,
    {
      id,
    }
  );

  // unstable_after from next: to update the views in the background without blocking the UI
  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: articleViews! + 1 })
        .commit()
  );

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <LiveIndicator />
      </div>

      <p className="view-text ">
        <span className="text-white">{`${articleViews}  ${view(articleViews)} `}</span>
      </p>
    </div>
  );
};

function view(views?: number) {
  if (views === 1) {
    return "visit";
  } else {
    return "visits";
  }
}
