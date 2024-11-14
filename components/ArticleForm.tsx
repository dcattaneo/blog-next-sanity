"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createArticle } from "@/lib/actions";
import debounce from "lodash.debounce";
import { LoaderCircle } from "lucide-react";

export const ArticleForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [imageError, setImageError] = useState(true);
  const [content, setContent] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  console.log("imageLoading:", isLoadingImage);
  console.log("imageError:", imageError);

  const handleSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        content: content,
      };

      await formSchema.parseAsync(formValues);

      const result = await createArticle(prevState, formData, content);

      if (result.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "Your article has been created successfully",
        });
        router.push(`/article/${result._id}`);
      }
      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please, check your inputs and try again",
          variant: "destructive",
        });
        return { ...prevState, error: "Validation failed", status: "ERROR" };
      } else {
        toast({
          title: "Error",
          description: "An unexpected error has occurred",
          variant: "destructive",
        });
        return {
          ...prevState,
          error: "An unexpected error has occurred",
          status: "ERROR",
        };
      }
    }
  };

  const validateImageUrl = async (url: string) => {
    setIsLoadingImage(true);
    setImageError(true);

    try {
      const res = await fetch(url, { method: "HEAD" });
      const contentType = res.headers.get("content-type");
      if (!contentType?.startsWith("image/")) {
        setImageError(true);
      } else {
        setImageError(false);
      }
    } catch {
      setImageError(true);
    } finally {
      setIsLoadingImage(false);
    }
  };

  const handleImageUrlChange = debounce((url: string) => {
    validateImageUrl(url);
  }, 300);

  const [state, formAction, isPending] = useActionState(handleSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="article-form">
      <div>
        <label htmlFor="title" className="article-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="article-form_input"
          required
          placeholder="Article title"
        />

        {errors.title && <p className="article-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="article-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="article-form_textarea"
          required
          placeholder="Article description"
        />

        {errors.description && (
          <p className="article-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="article-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="article-form_input"
          required
          placeholder="Article category"
        />

        {errors.category && (
          <p className="article-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="article-form_label">
          image URL
        </label>
        <div className="relative ">
          <Input
            onChange={(e) => handleImageUrlChange(e.target.value)}
            id="link"
            name="link"
            className="article-form_input pr-10 "
            placeholder="Article Image URL"
          />

          {isLoadingImage ? (
            <LoaderCircle className="absolute right-2 top-1/3   animate-spin" />
          ) : (
            ""
          )}
        </div>

        <p
          className={`${imageError ? "article-form_error" : "article-form_no_error"}`}
        >
          {imageError
            ? "The URL does not point to a valid image."
            : "This should work"}
        </p>

        {errors.link && <p className="article-form_error">{errors.link}</p>}
      </div>

      <div>
        <label htmlFor="content" className="article-form_label">
          Content
        </label>

        <MDEditor
          className="mt-3"
          value={content}
          onChange={(value) => setContent(value as string)}
          id="content"
          preview="live"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder: "Share your knowledge with the community",
          }}
          previewOptions={{ disallowedElements: ["style"] }}
        />

        {errors.content && (
          <p className="article-form_error">{errors.content}</p>
        )}
      </div>

      <Button className="article-form_btn rounded-2xl" disabled={isPending}>
        {isPending ? "Submitting" : "Create Article"}{" "}
      </Button>
    </form>
  );
};
