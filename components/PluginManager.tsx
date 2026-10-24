'use client';

import React, { useState } from 'react';
import { Package, ShieldCheck, Cpu, Zap, Check, Plus } from 'lucide-react';

interface Plugin {
  id: string;
  name: string;
  description: string;
  version: string;
  category: string;
  installed: boolean;
}

const INITIAL_PLUGINS: Plugin[] = [
  {
    id: "solana-agent-toolkit",
    name: "Solana Agent Toolkit",
    description: "Official integration package for autonomous AI agent actions, validator queries, and staking automation.",
    version: "2.4.0",
    category: "AI & Agents",
    installed: true,
  },
  {
    id: "solana-foundation-staking-toolkit",
    name: "Solana Foundation Staking Toolkit",
    description: "Compliant staking toolkit for delegation, epoch rewards calculation, and stake account management.",
    version: "1.8.2",
    category: "Staking",
    installed: true,
  },
  {
    id: "uncerson-drip-protection",
    name: "100% Principal Drip Protection",
    description: "Smart contract module ensuring 100% principal protection while continuously dripping high-yield ROI rewards.",
    version: "3.5.0",
    category: "Security & DeFi",
    installed: true,
  },
  {
    id: "uncerson-1b-roi-engine",
    name: "Uncerson 1,000,000,000 ROI Engine",
    description: "High-yield compounding math package designed for maximum geometric returns and MEV validator routing.",
    version: "4.0.0",
    category: "Yield Optimization",
    installed: true,
  },
];

export default function PluginManager() {
  const [plugins, setPlugins] = useState<Plugin[]>(INITIAL_PLUGINS);

  const togglePlugin = (id: string) => {
    setPlugins(plugins.map(p => p.id === id ? { ...p, installed: !p.installed } : p));
  };

  return (
    <div className="flex-1 bg-zinc-950 text-zinc-100 p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
              Solana Agent & Staking Toolkits
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Packages & Toolkit Marketplace</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Manage Solana Foundation Staking Toolkit, Solana Agent Toolkit, and 100% Principal Drip Protection packages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plugins.map((plugin) => (
            <div key={plugin.id} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-800 text-cyan-400 border border-zinc-700">
                    {plugin.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">v{plugin.version}</span>
                </div>
                <h3 className="text-base font-semibold text-white">{plugin.name}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{plugin.description}</p>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <div className="text-xs text-zinc-400 flex items-center gap-1.5 font-mono">
                  <span className={`w-2 h-2 rounded-full ${plugin.installed ? 'bg-emerald-500' : 'bg-zinc-600'}`}></span>
                  {plugin.installed ? 'Active Toolkit' : 'Not Installed'}
                </div>
                <button
                  onClick={() => togglePlugin(plugin.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                    plugin.installed 
                      ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300' 
                      : 'bg-cyan-500 hover:bg-cyan-400 text-zinc-950 shadow-lg shadow-cyan-500/20'
                  }`}
                >
                  {plugin.installed ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Active
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" /> Install
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
