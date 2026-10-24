import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { action, endpoint, address } = await req.json();
    
    // Strictly production QuickNode Mainnet-beta RPC endpoint
    const rpcUrl = endpoint || "https://api.mainnet-beta.solana.com";
    const connection = new Connection(rpcUrl, "confirmed");

    if (action === "health") {
      const startTime = Date.now();
      const slot = await connection.getSlot();
      const latency = Date.now() - startTime;
      const version = await connection.getVersion();
      
      return NextResponse.json({
        success: true,
        cluster: "Solana Mainnet-Beta (QuickNode Production)",
        slot,
        latencyMs: latency,
        version: version["solana-core"],
        status: "Production On-Chain Active",
      });
    }

    if (action === "balance") {
      if (!address) {
        return NextResponse.json({ error: "Address is required" }, { status: 400 });
      }
      try {
        const pubKey = new PublicKey(address);
        const balanceLamports = await connection.getBalance(pubKey);
        const balanceSOL = Number(balanceLamports) / LAMPORTS_PER_SOL;
        return NextResponse.json({
          success: true,
          address,
          balanceSOL,
          balanceLamports: Number(balanceLamports),
        });
      } catch (err: any) {
        return NextResponse.json({ error: `Invalid public key or RPC error: ${err.message}` }, { status: 400 });
      }
    }

    return NextResponse.json({ error: "Invalid action specified" }, { status: 400 });
  } catch (error: any) {
    console.error("Solana Mainnet RPC Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to communicate with Solana Mainnet RPC" },
      { status: 500 }
    );
  }
}
