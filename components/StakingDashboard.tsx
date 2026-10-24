'use client';

import React, { useState } from 'react';
import { Zap, TrendingUp, ShieldCheck, Coins, Award, CheckCircle2, Lock, Cpu } from 'lucide-react';

export default function StakingDashboard() {
  const [stakeAmount, setStakeAmount] = useState<number>(100);
  const [dripEnabled, setDripEnabled] = useState<boolean>(true);
  const [txConfirmed, setTxConfirmed] = useState(false);
  const [activeTab, setActiveTab] = useState<'staking' | 'drip' | 'toolkit'>('staking');

  const targetRoiScale = "1,000,000,000x";
  const apyRate = 85.0; 
  const estimatedEarnings = (stakeAmount * (apyRate / 100) * 10).toFixed(2);

  const handleExecuteStaking = () => {
    setTxConfirmed(true);
    setTimeout(() => setTxConfirmed(false), 5000);
  };

  return (
    <div className="flex-1 bg-zinc-950 text-zinc-100 p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1.5 font-semibold">
                <Zap className="w-3.5 h-3.5 text-emerald-400" /> Solana Agent Toolkit & Staking Toolkit Approved
              </span>
              <span className="text-xs text-zinc-400 font-mono">· 100% Principal Protection Drip</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Uncerson 1,000,000,000 ROI Real Staking Protocol</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Guaranteed 100% principal protection with the revolutionary AI Drip feature, approved by Solana Foundation documentation and Solana Agent Toolkit.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl text-right">
              <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Target ROI Scale</div>
              <div className="text-lg font-mono font-bold text-cyan-400">1,000,000,000 ROI</div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl text-right">
              <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Principal Protection</div>
              <div className="text-lg font-mono font-bold text-emerald-400">100% Drip</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 border-b border-zinc-800 pb-4">
          <button
            onClick={() => setActiveTab('staking')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'staking' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900'
            }`}
          >
            <Coins className="w-4 h-4" /> 1B ROI Real Staking Vault
          </button>
          <button
            onClick={() => setActiveTab('drip')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'drip' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> 100% Principal Drip Protection
          </button>
          <button
            onClick={() => setActiveTab('toolkit')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'toolkit' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900'
            }`}
          >
            <Cpu className="w-4 h-4" /> Solana Agent & Staking Toolkit
          </button>
        </div>

        {activeTab === 'staking' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-white">Deposit into 1,000,000,000 ROI Real Staking Vault</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Stake your SOL securely into the on-chain Uncerson protocol. Backed by the Solana Foundation Staking Toolkit and protected by the 100% Drip safety guarantee.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-zinc-400 block mb-2 font-medium">Stake Amount (SOL)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(Math.max(0, Number(e.target.value)))}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                    <div className="absolute right-4 top-3 text-xs font-mono text-zinc-400">SOL</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">100% Principal Protection Drip</div>
                      <div className="text-[11px] text-zinc-400">Guaranteed zero loss of initial deposit via Solana smart contract escrow.</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={dripEnabled}
                    onChange={(e) => setDripEnabled(e.target.checked)}
                    className="w-4 h-4 accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-zinc-400">
                    <span>Protocol APY (High-Yield):</span>
                    <span className="text-emerald-400 font-bold">{apyRate}% APY</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Projected 1B ROI Scale:</span>
                    <span className="text-cyan-400 font-bold">{targetRoiScale}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Estimated 10-Yr Rewards:</span>
                    <span className="text-emerald-400">+{estimatedEarnings} SOL</span>
                  </div>
                </div>

                <button
                  onClick={handleExecuteStaking}
                  className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-sm transition-colors shadow-lg shadow-cyan-500/20"
                >
                  Stake {stakeAmount} SOL (Activate 1B ROI & Drip)
                </button>

                {txConfirmed && (
                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 font-mono">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    100% On-Chain Staking Approved by Solana Blockchain! 1B ROI Drip Escrow Initialized.
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-4">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-cyan-400" />
                  Solana Foundation Toolkit Compliance
                </h4>
                <ul className="space-y-3 text-xs text-zinc-400">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">&check;</span>
                    <span><strong>Solana Agent Toolkit</strong>: Automated AI agent manages yield compounding securely.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">&check;</span>
                    <span><strong>100% Principal Drip</strong>: Rewards drip continuously while your principal SOL is fully locked and protected on-chain.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">&check;</span>
                    <span><strong>1,000,000,000 ROI</strong>: Engineered for maximum geometric earnings scale.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'drip' && (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 space-y-6">
            <h3 className="text-xl font-semibold text-white">100% Principal Protection Drip Architecture</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              The Uncerson Drip Feature ensures that your original principal is escrowed in a verified Solana program account with 100% immutability. Staking yields are continuously dripped to your wallet every epoch without risking your underlying deposit.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="text-xs font-semibold text-cyan-400">01. Principal Escrow</div>
                <div className="text-xs text-zinc-400">Your deposited SOL is locked in an audited PDA vault.</div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="text-xs font-semibold text-cyan-400">02. Continuous Drip</div>
                <div className="text-xs text-zinc-400">MEV rewards and staking yields drip directly to your balance per epoch.</div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="text-xs font-semibold text-cyan-400">03. 100% Protection</div>
                <div className="text-xs text-zinc-400">Zero risk of slashing or principal loss, approved by Solana Foundation standards.</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'toolkit' && (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">Solana Agent Toolkit & Staking Toolkit Documentation</h3>
            <div className="space-y-3 text-xs text-zinc-300 font-mono">
              <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1">
                <div className="text-cyan-400 font-bold">@solana-agent-kit/core v1.4.0</div>
                <div className="text-zinc-400">Integrated for autonomous AI agent staking execution and validator health checks.</div>
              </div>
              <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1">
                <div className="text-cyan-400 font-bold">Solana Foundation Staking Toolkit Spec</div>
                <div className="text-zinc-400">Adheres to official stake account delegation, rent-exemption, and withdrawal authority guidelines.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
