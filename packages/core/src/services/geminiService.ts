
import { SERVICES } from "../data/services";
import { ServiceStep, CaseData } from "../types";
import { createAIClient, getApiKey } from "../lib/ai-client";
import { AI_CONFIGS } from "../data/ai-prompts";

// --- Helper: Sanitasi Output JSON dari LLM ---
const cleanJsonOutput = (text: string): string => {
  if (!text) return "";
  // Hapus markdown code blocks jika ada (```json ... ```)
  return text.replace(/```json\n?|```/g, '').trim();
};

// --- Helper: Eksekusi Low-Level ---
const executeGenAI = async (
  modelName: string, 
  content: string, 
  config: any = {}
): Promise<string | undefined> => {
  const apiKey = getApiKey();
  if (!apiKey) return undefined;
  
  try {
    const ai = createAIClient();
    const response = await ai.models.generateContent({
      model: modelName,
      contents: content,
      config: config
    });
    return response.text;
  } catch (error) {
    console.error("AI Service Error:", error);
    return undefined;
  }
};

// --- Business Logic Services ---

export const askLegalAssistant = async (prompt: string): Promise<string> => {
  const cfg = AI_CONFIGS.legalAssistant;
  const text = await executeGenAI(cfg.model, prompt, { ...cfg.config, systemInstruction: cfg.systemInstruction });
  return text || "Maaf, sistem sedang sibuk. Silakan coba sesaat lagi.";
};

export const summarizeCase = async (caseData: CaseData): Promise<{ summary: string; risks: string[] }> => {
  const cfg = AI_CONFIGS.summarizeCase;
  const text = await executeGenAI(cfg.model, cfg.prompt(caseData), cfg.config);
  
  try {
    return JSON.parse(cleanJsonOutput(text || ''));
  } catch (e) {
    return { summary: "Gagal memproses rangkuman otomatis.", risks: [] };
  }
};

export const generateCaseStrategy = async (caseData: CaseData): Promise<{ steps: string[]; legalBasis: string[] }> => {
  const cfg = AI_CONFIGS.caseStrategy;
  const text = await executeGenAI(cfg.model, cfg.prompt(caseData), cfg.config);
  
  try {
    return JSON.parse(cleanJsonOutput(text || ''));
  } catch (e) {
    return { steps: ["Analisis strategi gagal dimuat."], legalBasis: [] };
  }
};

export const draftLegalDocument = async (docType: string, clientInfo: string, matterDetails: string): Promise<string> => {
  const cfg = AI_CONFIGS.draftDocument;
  const text = await executeGenAI(cfg.model, cfg.prompt(docType, clientInfo, matterDetails), cfg.config);
  return text || "Gagal membuat draf dokumen. Silakan coba lagi.";
};

export const refineDraft = async (currentDraft: string, instructions: string): Promise<string> => {
  const cfg = AI_CONFIGS.refineDraft;
  const text = await executeGenAI(cfg.model, cfg.prompt(currentDraft, instructions));
  return text || currentDraft;
};

export const recommendService = async (problemDescription: string) => {
  const cfg = AI_CONFIGS.recommendService;
  // Mengambil data layanan terbaru sebagai konteks
  const servicesList = SERVICES.map(s => `${s.title} (ID: ${s.id}) - ${s.description} - Biaya Mulai: ${s.basePrice}`).join('\n');
  
  const text = await executeGenAI(cfg.model, cfg.prompt(problemDescription, servicesList), cfg.config);
  
  try {
    return JSON.parse(cleanJsonOutput(text || ''));
  } catch (e) {
    return null;
  }
};

export const generateServiceSOP = async (title: string, description: string): Promise<ServiceStep[]> => {
  const cfg = AI_CONFIGS.serviceSOP;
  const text = await executeGenAI(cfg.model, cfg.prompt(title, description), cfg.config);
  
  try {
    const steps = JSON.parse(cleanJsonOutput(text || '[]'));
    return steps.map((s: any, index: number) => ({
      id: `sop_gen_${Date.now()}_${index}`,
      ...s
    }));
  } catch (e) {
    return [];
  }
};
