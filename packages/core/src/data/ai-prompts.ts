
import { Type, Schema } from "@google/genai";
import { CaseData } from "../types";

export const AI_CONFIGS = {
  legalAssistant: {
    model: 'gemini-3-flash-preview',
    systemInstruction: "Anda adalah Asisten Hukum Virtual CBP Corp. Jawablah dengan bahasa Indonesia formal, sopan, dan ringkas. Berikan disclaimer bahwa ini bukan nasihat hukum mengikat.",
    config: { thinkingConfig: { thinkingBudget: 0 } }
  },
  summarizeCase: {
    model: 'gemini-3-flash-preview',
    config: { responseMimeType: "application/json" },
    prompt: (c: CaseData) => `
      Rangkum kasus berikut untuk kebutuhan briefing pimpinan firma:
      Klien: ${c.clientName}, Tipe: ${c.caseType}, Divisi: ${c.division}
      Deskripsi: ${c.description}, Status: ${c.currentStage}
      Output JSON: { "summary": "Max 3 kalimat", "risks": ["Min 3 risiko hukum"] }
    `
  },
  caseStrategy: {
    model: 'gemini-3-pro-preview',
    config: {
      responseMimeType: "application/json",
      thinkingConfig: { thinkingBudget: 2048 }
    },
    prompt: (c: CaseData) => `
      Bertindaklah sebagai Senior Partner. Analisis kasus:
      Klien: ${c.clientName}, Masalah: ${c.description}, Tipe: ${c.caseType}
      Berikan: 1. Langkah strategis konkret. 2. Dasar hukum relevan (UU/Pasal).
      Format JSON: { "steps": ["Langkah 1...", "Langkah 2..."], "legalBasis": ["UU No. X...", "Pasal Z..."] }
    `
  },
  draftDocument: {
    model: 'gemini-3-pro-preview',
    config: { thinkingConfig: { thinkingBudget: 1024 } },
    prompt: (docType: string, clientInfo: string, matterDetails: string) => `
      Buat draf dokumen hukum "${docType}" profesional Bhs Indonesia.
      Klien: ${clientInfo}. Detail: ${matterDetails}.
      Ketentuan: Format standar hukum (Kepala, Komparisi, Premisse, Isi, Penutup). Placeholder [...] untuk data kurang. Bahasa tegas & lugas.
    `
  },
  refineDraft: {
    model: 'gemini-3-flash-preview',
    prompt: (draft: string, instructions: string) => `
      Anda Editor Hukum. Revisi draf berikut sesuai instruksi: "${instructions}".
      Draf Awal: """${draft}"""
      Output: Hanya hasil revisi lengkap tanpa komentar.
    `
  },
  recommendService: {
    model: 'gemini-3-flash-preview',
    config: { responseMimeType: "application/json" },
    prompt: (desc: string, servicesList: string) => `
      Analisis masalah: "${desc}". Pilih 1 layanan paling relevan dari data berikut:
      ${servicesList}
      JSON Output: { "recommendedServiceId": "Nama", "estimatedComplexity": "Level", "reasoning": "Alasan", "estimatedCostRange": "Range IDR" }
    `
  },
  serviceSOP: {
    model: 'gemini-3-flash-preview',
    prompt: (title: string, desc: string) => `Buatkan SOP langkah demi langkah untuk layanan hukum: ${title}. Deskripsi: ${desc}.`,
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
      } as Schema
    }
  }
};
