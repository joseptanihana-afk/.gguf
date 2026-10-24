'use client';

import React, { useState } from 'react';
import { Wallet, Globe, Check, Copy, ExternalLink, Wifi } from 'lucide-react';

export default function Web3Connector() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const sharedAppUrl = "https://ais-pre-aiasezdc22pwppymarcx66-657144521.us-east1.run.app";

  const connectBrowserWallet = async () => {
    try {
      const provider = (window as any).solana || (window as any).phantom?.solana;
      if (provider) {
        const response = await provider.connect();
        const pubKey = response.publicKey.toString();
        setPublicKey(pubKey);
        setWalletConnected(true);

        const res = await fetch("/api/solana/rpc", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "balance", address: pubKey }),
        });
        const data = await res.json();
        if (data.success) {
          setBalance(data.balanceSOL);
        }
      } else {
        alert("No Solana browser wallet found (Phantom or Solflare required). Please install a browser extension.");
      }
    } catch (err: any) {
      console.error("Wallet connection error:", err);
      alert(`Wallet connection failed: ${err.message}`);
    }
  };

  const copySharedUrl = () => {
    navigator.clipboard.writeText(sharedAppUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="flex-1 bg-zinc-950 text-zinc-100 p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5" /> Internet-Native Web3 Platform (100% On-Chain)
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Internet-Native Web3 URL & Wallet Connector</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Access the live internet-native website URL, connect real browser wallets, and interact with the Solana mainnet blockchain.
          </p>
        </div>

        {/* Live Internet-Native URL Card */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            Live Internet-Native Website URL
          </h3>
          <p className="text-xs text-zinc-400">
            This is the live production URL hosted on the internet for public Web3 access.
          </p>

          <div className="flex gap-3">
            <input
              type="text"
              readOnly
              value={sharedAppUrl}
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-cyan-400 font-mono"
            />
            <button
              onClick={copySharedUrl}
              className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors flex items-center gap-2"
            >
              {copiedUrl ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copiedUrl ? "Copied" : "Copy URL"}
            </button>
            <a
              href={sharedAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
            >
              <ExternalLink className="w-4 h-4" /> Open Live
            </a>
          </div>
        </div>

        {/* Browser Wallet Connection Card */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Wallet className="w-5 h-5 text-cyan-400" />
            Browser Wallet Integration
          </h3>

          {walletConnected ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-emerald-400 pb-2 border-b border-zinc-800">
                  <span className="flex items-center gap-2"><Check className="w-4 h-4" /> Browser Wallet Connected</span>
                  <span>Solana Mainnet</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span className="text-zinc-500">Public Key:</span>
                  <span className="text-cyan-400 font-bold">{publicKey}</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span className="text-zinc-500">Balance:</span>
                  <span className="text-emerald-400 font-bold">{balance !== null ? `${balance} SOL` : 'Loading...'}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-zinc-400">
                Click below to connect your browser wallet (Phantom, Solflare, or Backpack) directly to the internet-native platform.
              </p>
              <button
                onClick={connectBrowserWallet}
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-sm transition-colors shadow-lg shadow-cyan-500/20 flex items-center gap-2"
              >
                <Wallet className="w-4 h-4" /> Connect Browser Wallet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
