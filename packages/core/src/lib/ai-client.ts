import { GoogleGenAI } from "@google/genai";

/**
 * Retrieves the API Key from environment variables.
 * Supports both Server-side (API_KEY) and Client-side (NEXT_PUBLIC_API_KEY) for Next.js.
 */
export const getApiKey = (): string => {
  try {
    if (typeof process !== 'undefined' && process.env) {
      // Private Key (Server-side only) — never expose to the browser
      if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
      if (process.env.API_KEY) return process.env.API_KEY;
    }
  } catch (e) {
    // Graceful fallback if process is undefined
  }
  return '';
};

/**
 * Creates and returns a configured GoogleGenAI client instance.
 * @returns GoogleGenAI instance
 */
export const createAIClient = (): GoogleGenAI => {
  const apiKey = getApiKey();
  return new GoogleGenAI({ apiKey });
};
