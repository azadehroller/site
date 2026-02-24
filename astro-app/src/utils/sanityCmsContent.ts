/**
 * Sanity CMS Content for Chatbot Knowledge Base
 *
 * Fetches all website content from Sanity and provides keyword-based
 * relevance search for the AI chatbot. Content is cached for 1 week
 * to minimise Sanity API calls — the LLM only needs up-to-date data
 * when content materially changes, not on every request.
 */

import { sanityClient } from 'sanity:client';
import groq from 'groq';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ContentChunk {
  type: string;
  title: string;
  url: string;
  content: string; // combined plain-text blob used for scoring + context
}

interface RawDoc {
  type: string;
  title: string;
  url: string;
  description: string;
}

interface RawContentResult {
  homepage: RawDoc | null;
  pages: RawDoc[];
  features: RawDoc[];
  industries: RawDoc[];
  solutions: RawDoc[];
  posts: RawDoc[];
  articles: RawDoc[];
  competitors: RawDoc[];
  partners: RawDoc[];
}

// ── 1-week in-memory cache ────────────────────────────────────────────────────

const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 1 week

interface ContentCache {
  chunks: ContentChunk[];
  fetchedAt: number;
}

let contentCache: ContentCache | null = null;

// ── GROQ query ────────────────────────────────────────────────────────────────

/**
 * Fetches readable text from every published document type on the site.
 * Each document is projected to { type, title, url, description } so the
 * result is uniform and easy to process.
 *
 * For blog posts the `excerpt` is used as the description.
 * coalesce() ensures we always get a string even when the field is empty.
 */
const ALL_CONTENT_QUERY = groq`{
  "homepage": *[_type == "homepage"][0] {
    "type": "homepage",
    "title": coalesce(title, "Home"),
    "url": "/",
    "description": ""
  },
  "pages": *[_type == "page" && defined(slug.current)] {
    "type": "page",
    "title": title,
    "url": "/" + slug.current,
    "description": coalesce(description, "")
  },
  "features": *[_type == "feature" && isTemplate != true && defined(slug.current)] {
    "type": "feature",
    "title": title,
    "url": "/features/" + slug.current,
    "description": coalesce(description, "")
  },
  "industries": *[_type == "industry" && isTemplate != true && defined(slug.current)] {
    "type": "industry",
    "title": title,
    "url": "/industries/" + slug.current,
    "description": coalesce(description, "")
  },
  "solutions": *[_type == "solution" && defined(slug.current)] {
    "type": "solution",
    "title": title,
    "url": "/solutions/" + slug.current,
    "description": coalesce(description, "")
  },
  "posts": *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    "type": "blog post",
    "title": title,
    "url": "/blog/" + slug.current,
    "description": coalesce(excerpt, "")
  },
  "articles": *[_type == "article" && defined(slug.current)] {
    "type": "article",
    "title": title,
    "url": "/articles/" + slug.current,
    "description": coalesce(description, "")
  },
  "competitors": *[_type == "competitor" && defined(slug.current)] {
    "type": "competitor comparison",
    "title": title,
    "url": "/competitors/" + slug.current,
    "description": coalesce(description, "")
  },
  "partners": *[_type == "partner" && defined(slug.current)] {
    "type": "partner",
    "title": title,
    "url": "/partners/" + slug.current,
    "description": coalesce(description, "")
  }
}`;

// ── Content fetching + caching ────────────────────────────────────────────────

async function fetchAllSanityContent(): Promise<ContentChunk[]> {
  // Serve cached content if still within the 1-week window
  if (contentCache && Date.now() - contentCache.fetchedAt < CACHE_TTL_MS) {
    const ageHours = Math.round((Date.now() - contentCache.fetchedAt) / 3_600_000);
    console.log(`[CmsContent] Cache hit — ${contentCache.chunks.length} chunks, age ${ageHours}h`);
    return contentCache.chunks;
  }

  console.log('[CmsContent] Fetching fresh content from Sanity...');

  const result = await sanityClient.fetch<RawContentResult>(
    ALL_CONTENT_QUERY,
    {},
    {
      perspective: 'published',
      useCdn: true, // Sanity CDN is fast and already caches aggressively
    }
  );

  // Flatten all document groups into a single list of content chunks
  const rawGroups: (RawDoc | null)[][] = [
    result.homepage ? [result.homepage] : [],
    result.pages ?? [],
    result.features ?? [],
    result.industries ?? [],
    result.solutions ?? [],
    result.posts ?? [],
    result.articles ?? [],
    result.competitors ?? [],
    result.partners ?? [],
  ];

  const chunks: ContentChunk[] = [];

  for (const group of rawGroups) {
    for (const doc of group) {
      if (!doc?.title) continue;

      // Build a plain-text blob that represents the page for scoring + LLM context
      const content = [
        `Page type: ${doc.type}`,
        `Title: ${doc.title}`,
        doc.description ? `Description: ${doc.description}` : '',
      ]
        .filter(Boolean)
        .join('\n');

      chunks.push({
        type: doc.type,
        title: doc.title,
        url: doc.url,
        content,
      });
    }
  }

  contentCache = { chunks, fetchedAt: Date.now() };
  console.log(`[CmsContent] Cached ${chunks.length} chunks from Sanity`);

  return chunks;
}

// ── Keyword relevance scoring ─────────────────────────────────────────────────

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'shall', 'can', 'need', 'ought',
  'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'about',
  'how', 'what', 'where', 'when', 'who', 'which', 'why',
  'i', 'me', 'my', 'we', 'our', 'you', 'your',
  'it', 'its', 'they', 'them', 'their',
  'and', 'or', 'but', 'if', 'so', 'than', 'that', 'this', 'these', 'those',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

function scoreChunk(chunk: ContentChunk, queryTokens: string[]): number {
  const body = chunk.content.toLowerCase();
  const titleLower = chunk.title.toLowerCase();
  let score = 0;

  for (const token of queryTokens) {
    // Count occurrences in the full content blob
    let pos = 0;
    while ((pos = body.indexOf(token, pos)) !== -1) {
      score++;
      pos += token.length;
    }
    // Extra weight for the keyword appearing in the page title
    if (titleLower.includes(token)) score += 3;
  }

  return score;
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Returns the most relevant Sanity content chunks for a given question.
 * Uses keyword-based scoring backed by a 1-week cached corpus.
 *
 * @param question  Raw user question
 * @param limit     Maximum number of chunks to return (default 5)
 */
export async function findRelevantContent(
  question: string,
  limit: number = 5
): Promise<ContentChunk[]> {
  const chunks = await fetchAllSanityContent();
  const queryTokens = tokenize(question);

  // If no meaningful keywords, return the first `limit` chunks as fallback
  if (queryTokens.length === 0) return chunks.slice(0, limit);

  return chunks
    .map((chunk) => ({ chunk, score: scoreChunk(chunk, queryTokens) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ chunk }) => chunk);
}

/**
 * Force-clears the 1-week cache (e.g., called from a Sanity webhook).
 */
export function clearContentCache(): void {
  contentCache = null;
  console.log('[CmsContent] Cache cleared');
}
