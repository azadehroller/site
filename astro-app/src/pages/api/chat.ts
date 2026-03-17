import type { APIRoute } from 'astro';

// Chatbot temporarily disabled.
// To re-enable: restore the full implementation from git history.

export const POST: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      error: 'Chatbot is currently unavailable',
      code: 'CHATBOT_DISABLED',
    }),
    { status: 503, headers: { 'Content-Type': 'application/json' } }
  );
};
