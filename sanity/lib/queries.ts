import { defineQuery } from "next-sanity";

export const ARTICLES_QUERY =
  defineQuery(`*[_type == "article" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search || description match $search] | order(_createdAt desc) {
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

export const ARTICLE_BY_ID_QUERY =
  defineQuery(`*[_type == "article" && _id == $id] [0] {
  _id, 
    title,
    slug, 
    _createdAt, 
    category, 
    author -> {
      _id, name, image, bio, username
    }, 
    views, 
    description, 
    image,
    post,
}`);

export const ARTICLE_VIEWS_QUERY =
  defineQuery(`*[_type == "article" && _id == $id] [0] {
  _id,
  views
  }`);

export const AUTHOR_GITHUB_ID_QUERY = defineQuery(`
  *[_type == "author" && id == $id][0]{
      _id,
      id,
      name,
      username,
      email,
      image,
      bio
  }
  `);

export const AUTHOR_ID_QUERY = defineQuery(`
    *[_type == "author" && _id == $id][0]{
        _id,
        id,
        name,
        username,
        email,
        image,
        bio
    }
    `);

export const ARTICLES_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "article" && author._ref == $id] | order(_createdAt desc) {
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

// In order to fetch => slug : "related-articles"

export const RELATED_ARTICLES_BY_SLUG =
  defineQuery(`*[_type == "related" && slug.current == $slug ][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author -> {
      _id,
      name,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    post
  }
}`);
