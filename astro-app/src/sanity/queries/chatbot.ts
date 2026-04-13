import groq from "groq";
import { loadQuery } from "../../utils/loadQuery";
import type { ChatbotConfig } from "../types";

export async function getChatbotConfig(request?: Request) {
  return await loadQuery<ChatbotConfig | null>({
    query: groq`*[_type == "chatbotConfig" && _id == "chatbotConfig"][0]{
      enabled,
      displayName,
      welcomeMessage,
      systemPrompt,
      fallbackMessage,
      errorMessage,
      maxChunks,
      similarityThreshold,
      maxTokens
    }`,
    request,
  });
}
