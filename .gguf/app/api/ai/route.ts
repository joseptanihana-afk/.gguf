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

    let systemInstruction = "You are Uncerson LLM Agent, the elite on-chain Solana developer and AI architect integrated with the Solana Agent Toolkit and Solana Foundation Staking Toolkit. You specialize in 1,000,000,000 ROI earnings staking, 100% principal protection Drip feature, and secure on-chain smart contracts. Provide production-grade Rust/Anchor code compliant with Solana Foundation guidelines.";

    if (mode === "drip" || mode === "protection") {
      systemInstruction += " Focus on the 100% principal protection Drip feature, ensuring zero loss of staked SOL while maximizing 1,000,000,000 ROI yield via automated MEV validator routing.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.2,
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
