import type { APIRoute } from 'astro';
import { loadQuery } from '../../../utils/loadQuery';
import groq from 'groq';

export const GET: APIRoute = async ({ url, request }) => {
  const slug = url.searchParams.get('slug') || 'funvilla-play-center';

  try {
    // Fetch the specific post with all topic details
    const { data: post } = await loadQuery<any>({
      query: groq`*[_type == "post" && slug.current == $slug][0]{
        _id,
        _type,
        title,
        slug,
        publishedAt,
        _createdAt,
        // Raw topics reference array (before dereferencing)
        "topicsRaw": topics,
        // Dereferenced topics
        "topics": topics[]->{
          _id,
          _type,
          name,
          slug,
          hubspotId
        },
        // Count of topics
        "topicsCount": count(topics),
        // Check if topics field exists
        "hasTopicsField": defined(topics)
      }`,
      params: { slug },
      request,
    });

    // Also fetch ALL posts to see which ones have topics
    const { data: allPosts } = await loadQuery<any[]>({
      query: groq`*[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc)[0...20] {
        _id,
        title,
        "slug": slug.current,
        "topicsCount": count(topics),
        "hasTopicsField": defined(topics),
        "topics": topics[]->{ name, "slugCurrent": slug.current }
      }`,
      request,
    });

    // Summarize posts with topics
    const postsWithTopics = allPosts?.filter(p => p.topicsCount > 0) || [];
    const postsWithoutTopics = allPosts?.filter(p => p.topicsCount === 0) || [];

    return new Response(JSON.stringify({
      requestedSlug: slug,
      post: post || null,
      summary: {
        totalPosts: allPosts?.length || 0,
        postsWithTopics: postsWithTopics.length,
        postsWithoutTopics: postsWithoutTopics.length,
      },
      postsWithTopicsList: postsWithTopics.map(p => ({
        title: p.title,
        slug: p.slug,
        topicsCount: p.topicsCount,
        topics: p.topics
      })),
      postsWithoutTopicsList: postsWithoutTopics.slice(0, 10).map(p => ({
        title: p.title,
        slug: p.slug,
        hasTopicsField: p.hasTopicsField
      }))
    }, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({
      error: error.message,
      stack: error.stack
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
