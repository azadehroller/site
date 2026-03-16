/**
 * Ollama API wrapper for embeddings and chat completions.
 * Used by the chatbot to embed questions and generate answers.
 *
 * Requires Ollama running locally at http://localhost:11434
 * Uses the 'mistral' model for both embeddings and generation.
 */

const OLLAMA_URL = 'http://localhost:11434';
const MODEL = 'mistral';

interface OllamaEmbeddingResponse {
  embedding: number[];
}

interface OllamaGenerateResponse {
  response: string;
}

/**
 * Generate an embedding vector for the given text using Ollama.
 */
export async function embedQuestion(question: string): Promise<number[]> {
  const response = await fetch(`${OLLAMA_URL}/api/embeddings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      prompt: question,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('[Ollama] Embedding error:', error);
    throw new Error('OLLAMA: Failed to generate embedding');
  }

  const data: OllamaEmbeddingResponse = await response.json();
  return data.embedding;
}

interface GenerateAnswerParams {
  question: string;
  context: string;
  systemPrompt: string;
  maxTokens: number;
}

/**
 * MANDATORY SYSTEM PROMPT
 * This prompt must be used exactly as specified.
 */
const SYSTEM_PROMPT = `You are a ROLLER documentation assistant.

Your task is to answer user questions using ONLY the ROLLER Help Center documentation provided below.

Rules:
- Use only the provided documentation to answer.
- Do not use external knowledge or fabricate features, settings, or workflows.
- If the documentation below contains relevant information, answer the question directly and confidently. Do NOT add disclaimers like "I couldn't find" or "Based on the provided documentation" — just answer.
- If the documentation below contains NO relevant information at all, respond exactly with: "I couldn't find that information in the ROLLER documentation."
- Never combine a "not found" disclaimer with an actual answer. Either answer confidently or say you couldn't find it — never both.
- Be concise, clear, and helpful.
- Prefer step-by-step instructions when applicable.
- Do not mention documentation sources, embeddings, vector databases, or internal systems.`;

/**
 * Generate a grounded answer using Ollama's generate API.
 *
 * IMPORTANT: Ollama does not support system/user roles.
 * We concatenate the system prompt and user prompt into a single prompt.
 */
export async function generateAnswer({
  question,
  context,
  systemPrompt,
  maxTokens,
}: GenerateAnswerParams): Promise<string> {
  // Use the mandatory system prompt (ignore the one from params for now)
  const userPrompt = `Documentation:
${context}

Question:
${question}`;

  // Concatenate system prompt and user prompt as required by Ollama
  const fullPrompt = `${SYSTEM_PROMPT}

${userPrompt}`;

  const response = await fetch(`${OLLAMA_URL}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      prompt: fullPrompt,
      stream: false,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('[Ollama] Generation error:', error);
    throw new Error('OLLAMA: Failed to generate answer');
  }

  const data: OllamaGenerateResponse = await response.json();
  return data.response.trim();
}
