import { NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";

// Minimal protections: require a server-side shared secret header and basic rate limiting + model whitelist.
// Env variables used:
// - GEMINI_API_KEY or API_KEY (existing)
// - AI_PROXY_SECRET (shared secret for proxy requests)
// - ALLOWED_AI_MODELS (comma-separated list, optional)

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 10; // max requests per window per key/ip
const rateMap = new Map<string, number[]>(); // key -> timestamps

const getIp = (req: Request) => {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
};

const isRateLimited = (key: string) => {
  const now = Date.now();
  const arr = rateMap.get(key) || [];
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const filtered = arr.filter(t => t > windowStart);
  filtered.push(now);
  rateMap.set(key, filtered);
  return filtered.length > RATE_LIMIT_MAX;
};

const getAllowedModels = () => {
  const env = process.env.ALLOWED_AI_MODELS;
  if (env && env.trim().length > 0) return env.split(',').map(s => s.trim());
  // conservative default whitelist
  return ['gemma-1', 'gemma-4'];
};

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API Key not configured on server' }, { status: 500 });
    }

    // Basic auth: require header 'x-cbp-ai-secret' equal to AI_PROXY_SECRET
    const providedSecret = req.headers.get('x-cbp-ai-secret') || req.headers.get('authorization');
    const expectedSecret = process.env.AI_PROXY_SECRET;
    if (!expectedSecret || !providedSecret || providedSecret !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized: missing or invalid proxy secret' }, { status: 401 });
    }

    // Rate limit per-secret or per-ip
    const clientKey = providedSecret || getIp(req);
    if (isRateLimited(clientKey)) {
      return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 });
    }

    const body = await req.json();
    const { modelName, content, config } = body || {};

    // Validate model whitelist
    const allowed = getAllowedModels();
    if (!modelName || !allowed.includes(modelName)) {
      return NextResponse.json({ error: 'Model not allowed' }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: modelName,
      contents: content,
      config: config
    });

    return NextResponse.json({ text: response?.text ?? null });
  } catch (error: any) {
    console.error('API AI Route Error:', error);
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}
