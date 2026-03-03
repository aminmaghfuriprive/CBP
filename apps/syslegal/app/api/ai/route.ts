import { NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { modelName, content, config } = await req.json();
    
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: "API Key not configured on server" }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: modelName,
      contents: content,
      config: config
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("API AI Route Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
