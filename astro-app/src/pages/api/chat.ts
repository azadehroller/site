import type { APIRoute } from 'astro';
import { getChatbotConfig } from '@utils/sanity';
import { generateAnswer } from '@utils/ai/ollama';
import { findRelevantContent } from '@utils/sanityCmsContent';
import { checkRateLimit } from '@utils/rateLimit';

interface ChatRequest {
  question: string;
  conversationId?: string;
}

interface ChatResponse {
  answer: string;
  sources: Array<{
    title: string;
    url?: string;
  }>;
  conversationId: string;
}

interface ErrorResponse {
  error: string;
  code: string;
}

function generateConversationId(): string {
  return `conv_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

function logUnansweredQuestion(question: string, conversationId: string): void {
  console.log(`[Chat API] Unanswered question logged:`, {
    question,
    conversationId,
    timestamp: new Date().toISOString(),
  });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    // 1. Rate limiting check
    const rateLimitResult = await checkRateLimit(clientAddress);
    if (!rateLimitResult.allowed) {
      return new Response(
        JSON.stringify({
          error: 'Too many requests. Please wait before trying again.',
          code: 'RATE_LIMITED',
        } as ErrorResponse),
        { status: 429, headers }
      );
    }

    // 2. Parse and validate request body
    let body: ChatRequest;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({
          error: 'Invalid JSON in request body',
          code: 'INVALID_JSON',
        } as ErrorResponse),
        { status: 400, headers }
      );
    }

    const { question, conversationId } = body;

    if (!question || typeof question !== 'string') {
      return new Response(
        JSON.stringify({
          error: 'Question is required',
          code: 'MISSING_QUESTION',
        } as ErrorResponse),
        { status: 400, headers }
      );
    }

    const trimmedQuestion = question.trim();
    if (trimmedQuestion.length < 3) {
      return new Response(
        JSON.stringify({
          error: 'Question too short (minimum 3 characters)',
          code: 'QUESTION_TOO_SHORT',
        } as ErrorResponse),
        { status: 400, headers }
      );
    }

    if (trimmedQuestion.length > 1000) {
      return new Response(
        JSON.stringify({
          error: 'Question too long (maximum 1000 characters)',
          code: 'QUESTION_TOO_LONG',
        } as ErrorResponse),
        { status: 400, headers }
      );
    }

    // 3. Fetch chatbot configuration from Sanity
    const { data: config } = await getChatbotConfig(request);

    if (!config || !config.enabled) {
      return new Response(
        JSON.stringify({
          error: 'Chatbot is currently unavailable',
          code: 'CHATBOT_DISABLED',
        } as ErrorResponse),
        { status: 503, headers }
      );
    }

    // 4. Search Sanity content for relevant pages
    let chunks;
    try {
      chunks = await findRelevantContent(trimmedQuestion, config.maxChunks || 5);
    } catch (error) {
      console.error('[Chat API] Sanity content search error:', error);
      return new Response(
        JSON.stringify({
          error: config.errorMessage || 'Search service temporarily unavailable. Please try again.',
          code: 'CONTENT_SEARCH_ERROR',
        } as ErrorResponse),
        { status: 503, headers }
      );
    }

    // 5. Handle no relevant content
    const newConversationId = conversationId || generateConversationId();

    if (chunks.length === 0) {
      logUnansweredQuestion(trimmedQuestion, newConversationId);
      return new Response(
        JSON.stringify({
          answer: config.fallbackMessage,
          sources: [],
          conversationId: newConversationId,
        } as ChatResponse),
        { status: 200, headers }
      );
    }

    // 6. Build context from matched chunks — include the real page URL so the
    //    model can reference it directly instead of hallucinating one.
    const SITE_BASE = 'https://www.roller.software';
    const context = chunks
      .map((chunk, i) => {
        const absoluteUrl = chunk.url.startsWith('/')
          ? `${SITE_BASE}${chunk.url}`
          : chunk.url;
        return `[${i + 1}] ${chunk.content}\nURL: ${absoluteUrl}`;
      })
      .join('\n\n');

    // 7. Generate answer using Ollama
    let answer: string;
    try {
      answer = await generateAnswer({
        question: trimmedQuestion,
        context,
        systemPrompt: config.systemPrompt,
        maxTokens: config.maxTokens || 500,
      });
    } catch (error) {
      console.error('[Chat API] Ollama error:', error);
      return new Response(
        JSON.stringify({
          error: config.errorMessage || 'AI service temporarily unavailable. Please try again.',
          code: 'AI_SERVICE_ERROR',
        } as ErrorResponse),
        { status: 503, headers }
      );
    }

    // 8. Deduplicate sources by URL
    const seenUrls = new Set<string>();
    const sources = chunks
      .filter((chunk) => {
        if (!chunk.url || seenUrls.has(chunk.url)) return false;
        seenUrls.add(chunk.url);
        return true;
      })
      .map((chunk) => ({
        title: chunk.title,
        url: chunk.url,
      }));

    // 9. Return response
    return new Response(
      JSON.stringify({
        answer,
        sources,
        conversationId: newConversationId,
      } as ChatResponse),
      { status: 200, headers }
    );
  } catch (error) {
    console.error('[Chat API] Unexpected error:', error);

    return new Response(
      JSON.stringify({
        error: 'An unexpected error occurred. Please try again.',
        code: 'INTERNAL_ERROR',
      } as ErrorResponse),
      { status: 500, headers }
    );
  }
};
