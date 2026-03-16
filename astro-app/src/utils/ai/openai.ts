/**
 * OpenAI API wrapper for embeddings and chat completions.
 * Used by the chatbot to embed questions and generate answers.
 */

const OPENAI_API_KEY = import.meta.env.OPENAI_API_KEY;
const EMBEDDING_MODEL = 'text-embedding-3-small';
const CHAT_MODEL = 'gpt-4o-mini';

interface EmbeddingResponse {
  data: Array<{
    embedding: number[];
  }>;
}

interface ChatResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

/**
 * Generate an embedding vector for the given text using OpenAI's embedding API.
 */
export async function embedQuestion(question: string): Promise<number[]> {
  if (!OPENAI_API_KEY) {
    console.error('[OpenAI] OPENAI_API_KEY not configured');
    throw new Error('OPENAI: API key not configured');
  }

  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: question,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('[OpenAI] Embedding error:', error);
    throw new Error('OPENAI: Failed to generate embedding');
  }

  const data: EmbeddingResponse = await response.json();
  return data.data[0].embedding;
}

interface GenerateAnswerParams {
  question: string;
  context: string;
  systemPrompt: string;
  maxTokens: number;
}

/**
 * Generate a grounded answer using OpenAI's chat completion API.
 * Uses temperature=0 for deterministic, factual responses.
 */
export async function generateAnswer({
  question,
  context,
  systemPrompt,
  maxTokens,
}: GenerateAnswerParams): Promise<string> {
  if (!OPENAI_API_KEY) {
    console.error('[OpenAI] OPENAI_API_KEY not configured');
    throw new Error('OPENAI: API key not configured');
  }

  const userMessage = `Documentation:
${context}

Question:
${question}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: CHAT_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      max_tokens: maxTokens,
      temperature: 0,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('[OpenAI] Chat completion error:', error);
    throw new Error('OPENAI: Failed to generate answer');
  }

  const data: ChatResponse = await response.json();
  return data.choices[0].message.content;
}
