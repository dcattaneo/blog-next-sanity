import { z } from "zod";
export const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "The title must be at least 3 characters long" })
    .max(100, { message: "The title must be 100 characters or less" }),
  description: z
    .string()
    .min(10, { message: "The description must be at least 10 characters long" })
    .max(1000, {
      message: "The description must be at least 1000 characters or less",
    }),
  category: z
    .string()
    .min(3, { message: "The category must be at least 10 characters long" })
    .max(20, { message: "The category must be 20 characters or less" }),
  link: z
    .string()
    .url({ message: "Invalid URL:" })
    .refine(
      async (url) => {
        try {
          const res = await fetch(url, { method: "HEAD" });
          const contentType = res.headers.get("content-type");

          if (contentType?.startsWith("image/")) {
            return true;
          } else {
            return false;
          }
        } catch {
          return false;
        }
      },
      { message: "The URL must link to a valid image file." }
    ),
  content: z.string().min(10, { message: "The content should be longer" }),
});
