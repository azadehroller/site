import groq from "groq";
import { loadQuery } from "../../utils/loadQuery";
import type { Post, BlogTopic, BlogAuthor } from "../types";

export async function getPosts(request?: Request) {
  return await loadQuery<Post[]>({
    query: groq`*[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) {
      _type,
      _id,
      _createdAt,
      title,
      slug,
      excerpt,
      featuredImage{
        asset->{
          _id,
          url
        },
        alt
      },
      publishedAt,
      updatedAt,
      metaDescription,
      tags,
      hubspotId,
      "topics": topics[]->{ _id, name, slug, hubspotId },
      "author": author->{ _id, name, slug, bio, avatar, hubspotId }
    }`,
    request,
  });
}

// Optimized: Get blog landing page data in a single query
// This fetches posts (paginated), total count, topics, and editor picks all at once
export async function getBlogLandingData(page: number = 1, perPage: number = 9, request?: Request) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  
  return await loadQuery<{
    posts: Post[],
    total: number,
    topics: BlogTopic[],
    editorPicks: Post[],
    settings: { headerTheme?: string } | null
  }>({
    query: groq`{
      "settings": *[_type == "blogLandingPage"][0]{ headerTheme },
      "posts": *[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) [$start...$end] {
        _type,
        _id,
        _createdAt,
        title,
        slug,
        excerpt,
        featuredImage{
          asset->{
            _id,
            url
          },
          alt
        },
        publishedAt,
        "topics": topics[]->{ _id, name, slug },
        "wordCount": length(pt::text(body))
      },
      "total": count(*[_type == "post" && defined(slug.current)]),
      "topics": *[_type == "blogTopic"] | order(name asc) {
        _id,
        _type,
        name,
        slug,
        description,
        "postCount": count(*[_type == "post" && references(^._id)])
      },
      "editorPicks": *[_type == "post" && defined(slug.current) && "editor-picks" in topics[]->slug.current] | order(coalesce(publishedAt, _createdAt) desc) [0...4] {
        _type,
        _id,
        _createdAt,
        title,
        slug,
        excerpt,
        featuredImage{
          asset->{
            _id,
            url
          },
          alt
        },
        publishedAt,
        "topics": topics[]->{ _id, name, slug },
        "wordCount": length(pt::text(body))
      }
    }`,
    params: { start, end },
    request,
  });
}

export async function getPost(slug: string, request?: Request) {
  return await loadQuery<Post>({
    query: groq`*[_type == "post" && slug.current == $slug][0]{
      _type,
      _id,
      _createdAt,
      title,
      slug,
      excerpt,
      featuredImage{
        asset->{
          _id,
          url
        },
        alt
      },
      publishedAt,
      updatedAt,
      body,
      metaDescription,
      tags,
      hubspotId,
      hubspotUrl,
      // SEO fields
      seoTitle,
      seoDescription,
      seoImage{
        asset->{
          _id,
          url
        },
        alt
      },
      noIndex,
      canonicalUrl,
      "topics": topics[]->{ _id, name, slug, hubspotId },
      "author": author->{ _id, name, slug, bio, avatar, email, website, twitter, linkedin, facebook, hubspotId }
    }`,
    params: { slug },
    request,
  });
}

// Get related posts by topics
export async function getRelatedPosts(topicIds: string[], currentPostId: string, limit: number = 3, request?: Request) {
  return await loadQuery<Post[]>({
    query: groq`*[
      _type == "post"
      && defined(slug.current)
      && !(_id in [$currentPostId, "drafts." + $currentPostId])
      && count((topics[]._ref)[@ in $topicIds]) > 0
    ] | order(coalesce(publishedAt, _createdAt) desc)[0...$limit] {
      _type,
      _id,
      _createdAt,
      title,
      slug,
      excerpt,
      featuredImage{
        asset->{
          _id,
          url
        },
        alt
      },
      publishedAt,
      "topics": topics[]->{ _id, name, slug },
      "wordCount": length(pt::text(body))
    }`,
    params: { topicIds, currentPostId, limit },
    request,
  });
}

// Get all blog topics
export async function getBlogTopics(request?: Request) {
  return await loadQuery<BlogTopic[]>({
    query: groq`*[_type == "blogTopic"] | order(name asc) {
      _id,
      _type,
      name,
      slug,
      description,
      hubspotId,
      "postCount": count(*[_type == "post" && references(^._id)])
    }`,
    request,
  });
}

// Get posts by topic slug
export async function getPostsByTopic(topicSlug: string, request?: Request) {
  return await loadQuery<Post[]>({
    query: groq`*[
      _type == "post" 
      && defined(slug.current)
      && $topicSlug in topics[]->slug.current
    ] | order(coalesce(publishedAt, _createdAt) desc) {
      _type,
      _id,
      _createdAt,
      title,
      slug,
      excerpt,
      featuredImage{
        asset->{
          _id,
          url
        },
        alt
      },
      publishedAt,
      "topics": topics[]->{ _id, name, slug }
    }`,
    params: { topicSlug },
    request,
  });
}

// Get a single topic by slug
export async function getTopic(slug: string, request?: Request) {
  return await loadQuery<{ _id: string; name: string; slug: { current: string }; description?: string }>({
    query: groq`*[_type == "blogTopic" && slug.current == $slug][0]{
      _id,
      name,
      slug,
      description
    }`,
    params: { slug },
    request,
  });
}

// Search posts by query string
export async function searchPosts(searchQuery: string, limit: number = 10, request?: Request) {
  return await loadQuery<Post[]>({
    query: groq`*[
      _type == "post"
      && defined(slug.current)
      && (title match $searchQuery || excerpt match $searchQuery)
    ] | order(coalesce(publishedAt, _createdAt) desc)[0...$limit] {
      _type,
      _id,
      _createdAt,
      title,
      slug,
      excerpt,
      featuredImage{
        asset->{
          _id,
          url
        },
        alt
      },
      publishedAt,
      "topics": topics[]->{ _id, name, slug }
    }`,
    params: { searchQuery: `*${searchQuery}*`, limit },
    request,
  });
}

// Get a single author by slug
export async function getAuthor(slug: string, request?: Request) {
  return await loadQuery<{
    _id: string;
    name: string;
    slug: { current: string };
    bio?: string;
    avatar?: { url: string; alt?: string };
    website?: string;
    twitter?: string;
    linkedin?: string;
  }>({
    query: groq`*[_type == "blogAuthor" && slug.current == $slug][0]{
      _id,
      name,
      slug,
      bio,
      avatar,
      website,
      twitter,
      linkedin
    }`,
    params: { slug },
    request,
  });
}

// Get posts by author ID
export async function getPostsByAuthor(authorId: string, request?: Request) {
  return await loadQuery<Post[]>({
    query: groq`*[
      _type == "post" 
      && defined(slug.current)
      && author._ref == $authorId
    ] | order(coalesce(publishedAt, _createdAt) desc) {
      _type,
      _id,
      _createdAt,
      title,
      slug,
      excerpt,
      featuredImage{
        asset->{
          _id,
          url
        },
        alt
      },
      publishedAt,
      "topics": topics[]->{ _id, name, slug }
    }`,
    params: { authorId },
    request,
  });
}

