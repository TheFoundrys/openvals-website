import { groq } from "next-sanity";

export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  author-> {
    name,
    image
  }
}`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  title,
  slug,
  publishedAt,
  mainImage,
  author-> {
    name,
    image,
    bio
  },
  categories[]-> {
    title
  },
  body
}`;

export const postSlugsQuery = groq`*[_type == "post" && defined(slug.current)][].slug.current`;
