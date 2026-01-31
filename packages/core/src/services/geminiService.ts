
import { GoogleGenAI, Type } from "@google/genai";
import { SERVICES } from "../constants";
import { ServiceStep, CaseData } from "../types";

const getApiKey = (): string => {
  try {
    if (typeof process !== 'undefined' && process.env) {
      if (process.env.NEXT_PUBLIC_API_KEY) return process.env.NEXT_PUBLIC_API_KEY;
      if (process.env.API_KEY) return process.env.API_KEY;
    }
  } catch (e) {}
  return '';
};

const aiClient = () => new GoogleGenAI({ apiKey: getApiKey() });

export const askLegalAssistant = async (prompt: string): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) return "Konfigurasi API Key belum terpasang.";

  try {
    const ai = aiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { 
        systemInstruction: "Anda adalah Asisten Hukum Virtual CBP Corp. Jawablah dengan bahasa Indonesia formal, sopan, dan ringkas. Berikan disclaimer bahwa ini bukan nasihat hukum mengikat.",
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });
    return response.text || "Maaf, tidak dapat memproses.";
  } catch (error) {
    return "Terjadi kesalahan koneksi AI.";
  }
};

export const summarizeCase = async (caseData: CaseData): Promise<{ summary: string; risks: string[] }> => {
  const apiKey = getApiKey();
  if (!apiKey) return { summary: "API Key missing", risks: [] };

  try {
    const ai = aiClient();
    const prompt = `
      Rangkum kasus berikut untuk kebutuhan briefing pimpinan firma:
      Klien: ${caseData.clientName}
      Tipe: ${caseData.caseType}
      Divisi: ${caseData.division}
      Deskripsi: ${caseData.description}
      Status Terakhir: ${caseData.currentStage}

      Berikan output dalam format JSON:
      {
        "summary": "Rangkuman eksekutif maksimal 3 kalimat",
        "risks": ["Daftar minimal 3 poin risiko hukum yang harus diantisipasi"]
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    return JSON.parse(response.text || '{"summary": "", "risks": []}');
  } catch (error) {
    console.error(error);
    return { summary: "Gagal merangkum kasus.", risks: ["Koneksi AI terputus"] };
  }
};

export const draftLegalDocument = async (docType: string, clientInfo: string, matterDetails: string): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) return "API Key missing";

  try {
    const ai = aiClient();
    const prompt = `
      Buatkan draf dokumen hukum "${docType}" yang profesional dalam Bahasa Indonesia.
      Data Klien: ${clientInfo}
      Detail Masalah: ${matterDetails}

      Ketentuan:
      1. Gunakan format standar hukum Indonesia.
      2. Berikan [Placeholder] untuk data yang belum lengkap (seperti nomor KTP, tanggal lahir, dll).
      3. Pastikan bahasa tegas dan berwibawa sesuai standar CBP Corp Law Firm.
    `;

    // Menggunakan Gemini 3 Pro untuk tugas kompleks drafting
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: { 
        thinkingConfig: { thinkingBudget: 1000 } // Berikan budget berpikir untuk struktur hukum yang benar
      }
    });

    return response.text || "Gagal membuat draf.";
  } catch (error) {
    return "Error: " + (error instanceof Error ? error.message : "AI Error");
  }
};

export const recommendService = async (problemDescription: string) => {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  try {
    const ai = aiClient();
    const servicesList = SERVICES.map(s => `${s.title} (ID: ${s.id}) - ${s.description}`).join('\n');
    
    const prompt = `
      Analisis masalah hukum berikut: "${problemDescription}"
      Cocokkan dengan salah satu layanan kami:
      ${servicesList}
      Kembalikan HANYA JSON.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    return null;
  }
};

export const generateServiceSOP = async (title: string, description: string): Promise<ServiceStep[]> => {
  const apiKey = getApiKey();
  if (!apiKey) return [];

  try {
    const ai = aiClient();
    const prompt = `Buatkan SOP langkah demi langkah untuk: ${title} - ${description}`;

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
              phase: { type: Type.STRING },
              task: { type: Type.STRING },
              estimatedDays: { type: Type.NUMBER }
            },
            required: ["phase", "task", "estimatedDays"]
          }
        }
      }
    });

    const steps = JSON.parse(response.text || '[]');
    return steps.map((s: any, index: number) => ({
      id: `sop_gen_${Date.now()}_${index}`,
      ...s
    }));
  } catch (error) {
    return [];
  }
};
