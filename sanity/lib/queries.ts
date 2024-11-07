import { defineQuery } from "next-sanity";

export const ARTICLES_QUERY =
  defineQuery(`*[_type == "article" && defined(slug.current)] | order(_createdAt desc) {
  _id, 
    title,
    slug, 
    _createdAt, 
    category, 
    author -> {
      _id, name, image, bio
    }, 
    views, 
    description, 
    image 
}`);
