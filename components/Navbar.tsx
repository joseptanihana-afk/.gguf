'use client';

import React from 'react';
import { Terminal, Cpu, Layers, Zap, ShieldCheck, Globe } from 'lucide-react';

interface NavbarProps {
  activeTab: 'ide' | 'staking' | 'rpc' | 'plugins' | 'web3';
  setActiveTab: (tab: 'ide' | 'staking' | 'rpc' | 'plugins' | 'web3') => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-zinc-800 bg-zinc-950 text-zinc-100 sticky top-0 z-50">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <Terminal className="w-5 h-5 text-zinc-950 font-bold" />
        </div>
        <div>
          <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 block">
            Uncerson <span className="text-cyan-400 font-mono text-xs px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800">Web3 v3.5</span>
          </span>
        </div>
      </div>

      {/* Zone 2: 4-5 clean single-line text navigation links */}
      <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-zinc-400">
        <button
          onClick={() => setActiveTab('ide')}
          className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg ${
            activeTab === 'ide' ? 'text-cyan-400 bg-zinc-900 border border-zinc-800' : 'hover:text-zinc-200'
          }`}
        >
          <Cpu className="w-4 h-4" />
          AI IDE & Agent
        </button>
        <button
          onClick={() => setActiveTab('staking')}
          className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg ${
            activeTab === 'staking' ? 'text-cyan-400 bg-zinc-900 border border-zinc-800' : 'hover:text-zinc-200'
          }`}
        >
          <Zap className="w-4 h-4" />
          1B ROI Staking
        </button>
        <button
          onClick={() => setActiveTab('web3')}
          className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg ${
            activeTab === 'web3' ? 'text-cyan-400 bg-zinc-900 border border-zinc-800' : 'hover:text-zinc-200'
          }`}
        >
          <Globe className="w-4 h-4" />
          Web3 URL & Wallet
        </button>
        <button
          onClick={() => setActiveTab('rpc')}
          className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg ${
            activeTab === 'rpc' ? 'text-cyan-400 bg-zinc-900 border border-zinc-800' : 'hover:text-zinc-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          QuickNode RPC
        </button>
        <button
          onClick={() => setActiveTab('plugins')}
          className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg ${
            activeTab === 'plugins' ? 'text-cyan-400 bg-zinc-900 border border-zinc-800' : 'hover:text-zinc-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Toolkits
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => setActiveTab('web3')}
          className="px-4 py-2 text-xs font-semibold text-zinc-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0 shadow-lg shadow-cyan-400/20 flex items-center gap-1.5"
        >
          <Globe className="w-3.5 h-3.5" /> Connect Browser Web3
        </button>
      </div>
    </header>
  );
}
