import {defineType, defineField} from 'sanity'

/**
 * Chatbot Configuration Document
 * A singleton document for managing AI chatbot settings.
 * Controls the documentation assistant behavior including:
 * - Enable/disable toggle
 * - System prompts and fallback messages
 * - Retrieval parameters (chunks, threshold)
 */
export const chatbotConfig = defineType({
  name: 'chatbotConfig',
  title: 'Chatbot Configuration',
  type: 'document',
  icon: () => '🤖',
  groups: [
    {name: 'general', title: 'General', default: true},
    {name: 'prompts', title: 'Prompts'},
    {name: 'advanced', title: 'Advanced'},
  ],
  fields: [
    // General group
    defineField({
      name: 'enabled',
      title: 'Enable Chatbot',
      type: 'boolean',
      description: 'Toggle to enable or disable the chatbot across the site',
      group: 'general',
      initialValue: false,
    }),
    defineField({
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
      description: 'Name shown in the chat widget header',
      group: 'general',
      initialValue: 'ROLLER Assistant',
    }),
    defineField({
      name: 'welcomeMessage',
      title: 'Welcome Message',
      type: 'text',
      rows: 3,
      description: 'Initial message shown when user opens the chat',
      group: 'general',
      initialValue:
        'Hi! I can help you find information in the ROLLER documentation. What would you like to know?',
    }),

    // Prompts group
    defineField({
      name: 'systemPrompt',
      title: 'System Prompt',
      type: 'text',
      rows: 12,
      description:
        'Instructions for the AI on how to respond. This controls tone, constraints, and formatting.',
      group: 'prompts',
      initialValue: `You are a ROLLER documentation assistant.

Answer user questions using ONLY the provided ROLLER Help Center documentation.
Do not use external knowledge.
Do not guess or hallucinate.

If the answer is not found in the documentation, respond exactly with:
"I couldn't find that information in the ROLLER documentation."

Be concise, clear, and helpful.
Use step-by-step instructions when applicable.
Do not mention documents, embeddings, or internal systems.`,
    }),
    defineField({
      name: 'fallbackMessage',
      title: 'Fallback Message',
      type: 'text',
      rows: 3,
      description: 'Message shown when no relevant documentation is found',
      group: 'prompts',
      initialValue:
        "I couldn't find specific information about that in the ROLLER documentation. Please try rephrasing your question, or contact our support team for assistance.",
    }),
    defineField({
      name: 'errorMessage',
      title: 'Error Message',
      type: 'text',
      rows: 2,
      description: 'Message shown when an error occurs',
      group: 'prompts',
      initialValue: 'Sorry, I encountered an issue processing your request. Please try again.',
    }),

    // Advanced group
    defineField({
      name: 'maxChunks',
      title: 'Max Context Chunks',
      type: 'number',
      description: 'Maximum number of documentation chunks to include in context (3-10 recommended)',
      group: 'advanced',
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(20),
    }),
    defineField({
      name: 'similarityThreshold',
      title: 'Similarity Threshold',
      type: 'number',
      description:
        'Minimum similarity score (0.0-1.0) for including context. Higher = more relevant but fewer results.',
      group: 'advanced',
      initialValue: 0.7,
      validation: (Rule) => Rule.min(0).max(1),
    }),
    defineField({
      name: 'maxTokens',
      title: 'Max Response Tokens',
      type: 'number',
      description: 'Maximum tokens in AI response (controls response length)',
      group: 'advanced',
      initialValue: 500,
      validation: (Rule) => Rule.min(100).max(2000),
    }),
  ],
  preview: {
    select: {
      enabled: 'enabled',
    },
    prepare({enabled}) {
      return {
        title: 'Chatbot Configuration',
        subtitle: enabled ? 'Enabled' : 'Disabled',
      }
    },
  },
})
