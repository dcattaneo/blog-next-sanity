"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export async function createArticle(
  state: any,
  form: FormData,
  content: string
) {
  const session = await auth();

  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "content")
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const article = {
      title,
      description,
      category,
      image: link,
      views: 1, // Is this ok? I want to ensure that if somebody creates an article it starts with a default value and not undefined or null.
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      post: content,
    };

    const result = await writeClient.create({ _type: "article", ...article });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
}
