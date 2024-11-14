import { type SchemaTypeDefinition } from "sanity";
import { author } from "@/sanity/schemaTypes/author";
import { article } from "@/sanity/schemaTypes/article";
import { related } from "@/sanity/schemaTypes/related-articles";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, article, related],
};
