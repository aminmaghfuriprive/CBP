
import { GoogleGenAI, Type } from "@google/genai";
import { SERVICES } from "../constants";
import { ServiceStep } from "../types";

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

export const generateServiceSOP = async (title: string, description: string): Promise<ServiceStep[]> => {
  const apiKey = getApiKey();
  if (!apiKey) return [];

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
      Buatkan Standard Operating Procedure (SOP) langkah demi langkah untuk layanan hukum:
      Judul: ${title}
      Deskripsi: ${description}

      Buatlah langkah-langkah yang logis, profesional, dan detail mulai dari persiapan hingga selesai.
      Estimasi hari harus realistis.
      Gunakan Bahasa Indonesia.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              phase: { type: Type.STRING, description: "Fase (e.g., Persiapan, Eksekusi, Finalisasi)" },
              task: { type: Type.STRING, description: "Detail pekerjaan" },
              estimatedDays: { type: Type.NUMBER, description: "Estimasi hari kerja" }
            },
            required: ["phase", "task", "estimatedDays"]
          }
        }
      }
    });

    const steps = JSON.parse(response.text || '[]');
    
    // Assign random IDs client-side usually, but let's map it here to ensure structure
    return steps.map((s: any, index: number) => ({
      id: `sop_gen_${Date.now()}_${index}`,
      phase: s.phase,
      task: s.task,
      estimatedDays: s.estimatedDays
    }));

  } catch (error) {
    console.error("Gemini SOP Generation Error:", error);
    return [];
  }
};
