import type { APIRoute } from 'astro';
import { searchPosts } from '../../../utils/sanity';

export const GET: APIRoute = async ({ request, url }) => {
  const query = url.searchParams.get('q') || '';
  const limit = parseInt(url.searchParams.get('limit') || '10', 10);

  // Require at least 2 characters for search
  if (query.length < 2) {
    return new Response(JSON.stringify({ results: [], error: 'Query too short' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const { data: posts } = await searchPosts(query, limit, request);
    
    // Transform posts to a simpler format for the search results
    const results = posts.map(post => ({
      title: post.title,
      slug: post.slug?.current,
      excerpt: post.excerpt,
      image: post.featuredImage?.asset?.url,
      publishedAt: post.publishedAt,
      topics: post.topics?.map(t => t?.name).filter(Boolean),
    }));

    return new Response(JSON.stringify({ results }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Search error:', error);
    return new Response(JSON.stringify({ results: [], error: 'Search failed' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
