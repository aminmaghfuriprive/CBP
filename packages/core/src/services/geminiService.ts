import { GoogleGenAI } from "@google/genai";
import { SERVICES } from "../constants";

const getApiKey = (): string => {
  try {
    if (typeof process !== 'undefined' && process.env) {
      if (process.env.NEXT_PUBLIC_API_KEY) return process.env.NEXT_PUBLIC_API_KEY;
      if (process.env.API_KEY) return process.env.API_KEY;
    }
  } catch (e) {
    // Ignore error
  }
  return '';
};

export const askLegalAssistant = async (prompt: string): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) return "Konfigurasi API Key belum terpasang.";

  try {
    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-3-flash-preview';
    const systemInstruction = `
      Anda adalah Asisten Hukum Virtual CBP Corp.
      Jawablah dengan bahasa Indonesia formal, sopan, dan ringkas.
      Berikan disclaimer bahwa ini bukan nasihat hukum mengikat.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: { systemInstruction, thinkingConfig: { thinkingBudget: 0 } }
    });

    return response.text || "Maaf, tidak dapat memproses.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Terjadi kesalahan koneksi AI.";
  }
};

export const recommendService = async (problemDescription: string) => {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const servicesList = SERVICES.map(s => `${s.title} (ID: ${s.id}) - ${s.description}`).join('\n');
    
    const prompt = `
      Analisis masalah hukum berikut: "${problemDescription}"
      
      Cocokkan dengan salah satu layanan kami:
      ${servicesList}
      
      Kembalikan HANYA JSON dengan format:
      {
        "recommendedServiceId": "ID layanan yang paling cocok",
        "reasoning": "Penjelasan singkat mengapa layanan ini cocok (maks 2 kalimat)",
        "estimatedComplexity": "Rendah/Sedang/Tinggi",
        "estimatedCostRange": "Estimasi rentang biaya dalam Rupiah (contoh: 5.000.000 - 10.000.000)"
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Recommendation Error:", error);
    return null;
  }
};