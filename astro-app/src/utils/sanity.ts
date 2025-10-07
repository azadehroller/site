import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";
import { loadQuery } from "./loadQuery";

export async function getPosts(request?: Request) {
  return await loadQuery<Post[]>({
    query: groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`,
    request,
  });
}

export async function getPost(slug: string, request?: Request) {
  return await loadQuery<Post>({
    query: groq`*[_type == "post" && slug.current == $slug][0]`,
    params: { slug },
    request,
  });
}

export interface Post {
  _type: "post";
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset & { alt?: string };
  body: PortableTextBlock[];
}
