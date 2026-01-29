import { GoogleGenAI } from "@google/genai";

// Helper untuk mengambil API Key secara aman di berbagai environment (Vite/Next.js)
const getApiKey = (): string => {
  // Cek Vite Environment
  // Casting 'any' diperlukan karena TypeScript pada project Next.js tidak mengenali 'import.meta.env'
  const meta = import.meta as any;
  if (typeof meta !== 'undefined' && meta.env && meta.env.VITE_API_KEY) {
    return String(meta.env.VITE_API_KEY);
  }
  
  // Cek Next.js / Node Environment
  if (typeof process !== 'undefined' && process.env) {
    // Prioritaskan public key jika di client-side Next.js, fallback ke server key
    return (process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY || '') as string;
  }
  
  return '';
};

export const askLegalAssistant = async (prompt: string): Promise<string> => {
  const apiKey = getApiKey();
  
  if (!apiKey) return "Konfigurasi API Key belum terpasang. Mohon hubungi IT Administrator.";

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