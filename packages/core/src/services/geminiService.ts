
import { GoogleGenAI, Type } from "@google/genai";
import { SERVICES } from "../data/services";
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

export const generateCaseStrategy = async (caseData: CaseData): Promise<{ steps: string[]; legalBasis: string[] }> => {
  const apiKey = getApiKey();
  if (!apiKey) return { steps: [], legalBasis: [] };

  try {
    const ai = aiClient();
    const prompt = `
      Bertindaklah sebagai Senior Partner di Law Firm. Analisis kasus berikut:
      Klien: ${caseData.clientName}
      Masalah: ${caseData.description}
      Tipe: ${caseData.caseType}

      Berikan:
      1. Langkah-langkah strategis konkret (taktis & prosedural) untuk memenangkan/menyelesaikan kasus ini.
      2. Dasar hukum yang relevan (UU/Pasal/PP) di Indonesia yang menjadi landasan argumen.

      Format JSON:
      {
        "steps": ["Langkah 1...", "Langkah 2...", "Langkah 3..."],
        "legalBasis": ["UU No. X Tahun Y...", "Pasal Z KUHPerdata..."]
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Menggunakan Pro untuk penalaran hukum yang lebih dalam
      contents: prompt,
      config: { 
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 2048 } // Budget berpikir untuk strategi
      }
    });

    return JSON.parse(response.text || '{"steps": [], "legalBasis": []}');
  } catch (error) {
    console.error("Strategy Gen Error:", error);
    return { steps: ["Gagal menghasilkan strategi."], legalBasis: [] };
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
      1. Gunakan format standar hukum Indonesia (Kepala surat, Komparisi, Premisse, Isi, Penutup).
      2. Berikan [Placeholder] untuk data yang belum lengkap.
      3. Gunakan bahasa hukum yang tegas, lugas, dan berwibawa.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: { thinkingConfig: { thinkingBudget: 1024 } }
    });

    return response.text || "Gagal membuat draf.";
  } catch (error) {
    return "Error: " + (error instanceof Error ? error.message : "AI Error");
  }
};

export const refineDraft = async (currentDraft: string, instructions: string): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) return currentDraft;

  try {
    const ai = aiClient();
    const prompt = `
      Anda adalah Editor Hukum Senior. Tugas Anda adalah merevisi draf dokumen berikut sesuai instruksi spesifik.
      
      Draf Awal:
      """
      ${currentDraft}
      """

      Instruksi Revisi:
      "${instructions}"

      Output: Hanya berikan hasil draf yang sudah direvisi secara lengkap. Jangan berikan komentar pengantar.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', // Flash cukup untuk rewriting/editing
      contents: prompt
    });

    return response.text || currentDraft;
  } catch (error) {
    return currentDraft;
  }
};

export const recommendService = async (problemDescription: string) => {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  try {
    const ai = aiClient();
    const servicesList = SERVICES.map(s => `${s.title} (ID: ${s.id}) - ${s.description} - Biaya Mulai: ${s.basePrice}`).join('\n');
    
    const prompt = `
      Analisis masalah hukum berikut: "${problemDescription}"
      
      Tugas:
      1. Pilih 1 layanan kami yang paling relevan.
      2. Berikan estimasi kompleksitas (Rendah/Sedang/Tinggi/Sangat Tinggi).
      3. Berikan alasan singkat mengapa layanan ini cocok (reasoning).
      4. Berikan estimasi range biaya (IDR) yang masuk akal berdasarkan base price layanan + kompleksitas.

      Data Layanan:
      ${servicesList}

      Kembalikan JSON:
      {
        "recommendedServiceId": "Nama Layanan",
        "estimatedComplexity": "String",
        "reasoning": "String",
        "estimatedCostRange": "String (e.g. Rp 5.000.000 - Rp 8.000.000)"
      }
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
    const prompt = `Buatkan SOP langkah demi langkah untuk layanan hukum: ${title}. Deskripsi: ${description}.`;

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
