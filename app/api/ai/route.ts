import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

export async function POST(req: NextRequest) {
  try {
    const { prompt, context, mode } = await req.json();

    let systemInstruction = "You are Uncerson, an elite senior Solana protocol engineer and human-like AI collaborator. Speak conversationally, directly, and naturally like an expert developer—avoid robotic filler, canned pleasantries, or repetitive corporate phrasing. You write precise Rust/Anchor code, optimize MEV staking yields for the 1B ROI pool, and handle 100% principal/price protection drip logic.";

    if (mode === "drip" || mode === "protection") {
      systemInstruction += " Focus on explaining how the 100% price protection drip escrow works on-chain without risking the user's initial SOL deposit.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.3,
        tools: [{ googleSearch: {} }],
      },
    });

    return NextResponse.json({ 
      text: response.text || "No response generated.",
      groundingMetadata: response.candidates?.[0]?.groundingMetadata || null
    });
  } catch (error: any) {
    console.error("Gemini AI Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate AI response." },
      { status: 500 }
    );
  }
}
