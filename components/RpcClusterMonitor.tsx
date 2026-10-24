'use client';

import React, { useState } from 'react';
import { Layers, Zap, RefreshCw, CheckCircle2, AlertCircle, Wallet, Activity, Globe } from 'lucide-react';

export default function RpcClusterMonitor() {
  const [endpoint, setEndpoint] = useState("https://api.mainnet-beta.solana.com");
  const [clusterInfo, setClusterInfo] = useState<any>(null);
  const [loadingHealth, setLoadingHealth] = useState(false);
  const [walletAddress, setWalletAddress] = useState("Uncerson999911111111111111111111111111111111");
  const [walletBalance, setWalletBalance] = useState<any>(null);
  const [loadingBalance, setLoadingBalance] = useState(false);

  const checkRpcHealth = async () => {
    setLoadingHealth(true);
    try {
      const res = await fetch("/api/solana/rpc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "health", endpoint }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setClusterInfo(data);
    } catch (err: any) {
      setClusterInfo({ error: err.message });
    } finally {
      setLoadingHealth(false);
    }
  };

  const checkBalance = async () => {
    setLoadingBalance(true);
    try {
      const res = await fetch("/api/solana/rpc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "balance", endpoint, address: walletAddress }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setWalletBalance(data);
    } catch (err: any) {
      setWalletBalance({ error: err.message });
    } finally {
      setLoadingBalance(false);
    }
  };

  return (
    <div className="flex-1 bg-zinc-950 text-zinc-100 p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" /> 100% On-Chain Web3 & QuickNode Mainnet RPC
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Web3 Solana Mainnet Cluster & RPC Hub</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Real Web3 node connection supporting QuickNode Mainnet-beta endpoints with zero off-chain simulation.
          </p>
        </div>

        {/* Endpoint Config Card */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            QuickNode Mainnet RPC Endpoint
          </h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="https://your-endpoint.solana-mainnet.quiknode.pro/token/"
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={checkRpcHealth}
              disabled={loadingHealth}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              {loadingHealth ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />}
              Test On-Chain RPC
            </button>
          </div>

          {clusterInfo && (
            <div className="mt-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs space-y-2">
              {clusterInfo.error ? (
                <div className="text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Error: {clusterInfo.error}
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between text-emerald-400 font-semibold pb-2 border-b border-zinc-800">
                    <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Status: {clusterInfo.status}</span>
                    <span>Cluster: {clusterInfo.cluster}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-2 text-zinc-300">
                    <div>
                      <div className="text-zinc-500 text-[10px]">CURRENT SLOT</div>
                      <div className="text-sm font-bold text-cyan-400 mt-0.5">{clusterInfo.slot?.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-zinc-500 text-[10px]">RPC LATENCY</div>
                      <div className="text-sm font-bold text-emerald-400 mt-0.5">{clusterInfo.latencyMs} ms</div>
                    </div>
                    <div>
                      <div className="text-zinc-500 text-[10px]">SOLANA CORE</div>
                      <div className="text-sm font-bold text-zinc-200 mt-0.5">{clusterInfo.version}</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Wallet Balance Inspector */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Wallet className="w-4 h-4 text-cyan-400" />
            Web3 Mainnet Wallet Balance Inspector
          </h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="Enter Solana Mainnet Public Key..."
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={checkBalance}
              disabled={loadingBalance}
              className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors flex items-center gap-2"
            >
              {loadingBalance ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wallet className="w-4 h-4" />}
              Fetch On-Chain Balance
            </button>
          </div>

          {walletBalance && !walletBalance.error && (
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs flex items-center justify-between">
              <span className="text-zinc-400">On-Chain Balance:</span>
              <span className="text-cyan-400 font-bold text-sm">{walletBalance.balanceSOL} SOL ({walletBalance.balanceLamports?.toLocaleString()} Lamports)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
