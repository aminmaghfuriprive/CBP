import { GoogleGenAI } from "@google/genai";

const getApiKey = (): string => {
  // Safe check for process.env (Next.js / Node)
  try {
    if (typeof process !== 'undefined' && process.env) {
      if (process.env.NEXT_PUBLIC_API_KEY) return process.env.NEXT_PUBLIC_API_KEY;
      if (process.env.API_KEY) return process.env.API_KEY;
    }
  } catch (e) {
    // Ignore error
  }

  // Safe check for import.meta.env (Vite)
  try {
    // Casting 'any' to avoid TypeScript errors in Node environments
    const meta = import.meta as any;
    if (meta && meta.env && meta.env.VITE_API_KEY) {
      return String(meta.env.VITE_API_KEY);
    }
  } catch (e) {
    // Ignore syntax or reference errors
  }
  
  return '';
};

export const askLegalAssistant = async (prompt: string): Promise<string> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    return "Konfigurasi API Key belum terpasang. Mohon hubungi IT Administrator.";
  }

  try {
    // Initialize client lazily here instead of top-level to avoid build errors
    const ai = new GoogleGenAI({ apiKey });
    
    const model = 'gemini-3-flash-preview';
    const systemInstruction = `
      Anda adalah Asisten Hukum Virtual untuk firma hukum CBP Corp.
      Gunakan bahasa Indonesia yang formal, sopan, dan profesional namun mudah dimengerti.
      Berikan ringkasan atau saran awal hukum berdasarkan hukum di Indonesia.
      Selalu sertakan disclaimer bahwa ini bukan nasihat hukum mengikat.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        thinkingConfig: { thinkingBudget: 0 } // Low latency for chat
      }
    });

    return response.text || "Maaf, saya tidak dapat memproses permintaan saat ini.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Terjadi kesalahan saat menghubungi layanan AI. Pastikan kuota API mencukupi.";
  }
};