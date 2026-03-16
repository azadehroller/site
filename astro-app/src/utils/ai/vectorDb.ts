/**
 * Qdrant Vector Database Client
 * Handles similarity search for documentation chunks.
 *
 * Supports both self-hosted Qdrant (no API key required) and Qdrant Cloud.
 *
 * Environment variables:
 * - QDRANT_URL: Qdrant server URL (e.g., http://localhost:6333 for self-hosted)
 * - QDRANT_API_KEY: API key for authentication (optional for self-hosted)
 * - QDRANT_COLLECTION: Collection name (default: roller-docs)
 */

const QDRANT_URL = import.meta.env.QDRANT_URL;
const QDRANT_API_KEY = import.meta.env.QDRANT_API_KEY;
const QDRANT_COLLECTION = import.meta.env.QDRANT_COLLECTION || 'roller-docs';

export interface DocumentChunk {
  id: string;
  content: string;
  title?: string;
  url?: string;
  score: number;
}

interface QdrantSearchResult {
  result: Array<{
    id: string | number;
    score: number;
    payload?: {
      content?: string;
      title?: string;
      url?: string;
      article_title?: string;
      article_url?: string;
    };
  }>;
}

interface QueryParams {
  embedding: number[];
  limit: number;
  threshold: number;
}

/**
 * Query Qdrant for similar documentation chunks.
 * Returns chunks sorted by similarity score (highest first).
 * Supports both self-hosted Qdrant (no API key) and Qdrant Cloud (with API key).
 */
export async function queryVectorDb(params: QueryParams): Promise<DocumentChunk[]> {
  const { embedding, limit, threshold } = params;

  if (!QDRANT_URL) {
    console.error('[VectorDB] QDRANT_URL not configured');
    throw new Error('VECTOR_DB: Not configured');
  }

  const url = `${QDRANT_URL}/collections/${QDRANT_COLLECTION}/points/search`;

  // Build headers - API key is optional for self-hosted Qdrant
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (QDRANT_API_KEY) {
    headers['api-key'] = QDRANT_API_KEY;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      vector: embedding,
      limit: limit,
      with_payload: true,
      score_threshold: threshold,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('[VectorDB] Qdrant query error:', error);
    throw new Error('VECTOR_DB: Query failed');
  }

  const data: QdrantSearchResult = await response.json();

  // Transform Qdrant results to DocumentChunk format
  const chunks: DocumentChunk[] = data.result.map((match) => ({
    id: String(match.id),
    content: match.payload?.content || '',
    title: match.payload?.title || match.payload?.article_title,
    url: match.payload?.url || match.payload?.article_url,
    score: match.score,
  }));

  return chunks;
}
