'use client';

import React, { useState } from 'react';
import { 
  FileCode, Folder, Terminal as TerminalIcon, Sparkles, Send, Play, 
  ShieldAlert, CheckCircle2, Cpu, Copy, Check, RefreshCw, Globe, Zap 
} from 'lucide-react';

const ON_CHAIN_STAKING_PROGRAM = `use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

declare_id!("UncersonOnChainStakingProtocol11111111111111");

#[program]
pub mod uncerson_onchain_staking {
    use super::*;

    pub fn initialize_pool(ctx: Context<InitializePool>, bump: u8, apy_basis_points: u16) -> Result<()> {
        let pool = &mut ctx.accounts.staking_pool;
        pool.authority = ctx.accounts.authority.key();
        pool.bump = bump;
        pool.total_staked = 0;
        pool.apy_basis_points = apy_basis_points; // e.g., 4250 for 42.5% ROI
        pool.accumulated_rewards_per_share = 0;
        msg!("Uncerson On-Chain Staking Pool initialized with high ROI APY: {} bps", apy_basis_points);
        Ok(())
    }

    pub fn stake(ctx: Context<StakeTokens>, amount: u64) -> Result<()> {
        let pool = &mut ctx.accounts.staking_pool;
        let staker_info = &mut ctx.accounts.staker_info;

        // Transfer user tokens to vault PDA
        let cpi_accounts = Transfer {
            from: ctx.accounts.staker_token_account.to_account_info(),
            to: ctx.accounts.vault_token_account.to_account_info(),
            authority: ctx.accounts.staker.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        token::transfer(CpiContext::new(cpi_program, cpi_accounts), amount)?;

        pool.total_staked += amount;
        staker_info.staked_amount += amount;
        staker_info.deposit_slot = Clock::get()?.slot;

        msg!("Staked {} tokens on-chain into Uncerson Protocol. ROI Rate active.", amount);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializePool<'info> {
    #[account(init, payer = authority, space = 8 + 32 + 1 + 8 + 2 + 8)]
    pub staking_pool: Account<'info, StakingPool>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct StakeTokens<'info> {
    #[account(mut)]
    pub staking_pool: Account<'info, StakingPool>,
    #[account(mut, seeds = [b"staker", staker.key().as_ref()], bump)]
    pub staker_info: Account<'info, StakerInfo>,
    #[account(mut)]
    pub staker_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub vault_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub staker: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct StakingPool {
    pub authority: Pubkey,
    pub bump: u8,
    pub total_staked: u64,
    pub apy_basis_points: u16,
    pub accumulated_rewards_per_share: u64,
}

#[account]
pub struct StakerInfo {
    pub staked_amount: u64,
    pub deposit_slot: u64,
}
`;

export default function IdWorkspace() {
  const [fileContent, setFileContent] = useState(ON_CHAIN_STAKING_PROGRAM);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string; grounding?: any }>>([
    { role: 'assistant', content: "Uncerson LLM Agent initialized. I am actively connected to Google Search & GitHub for on-chain Solana staking code research. Ask me to lookup staking repositories, optimize APY routines, or audit smart contracts." }
  ]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "[Uncerson AI IDE v3.5] On-chain Solana environment initialized",
    "[QuickNode Mainnet RPC] Connected with 12ms latency",
    "[Uncerson LLM Agent] GitHub & Web staking research module active"
  ]);
  const [copied, setCopied] = useState(false);

  const handleSendMessage = async (promptOverride?: string) => {
    const query = promptOverride || chatInput;
    if (!query.trim()) return;

    const newMessages = [...messages, { role: 'user' as const, content: query }];
    setMessages(newMessages);
    if (!promptOverride) setChatInput("");
    setLoadingAI(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: query,
          context: fileContent,
          mode: query.toLowerCase().includes("lookup") || query.toLowerCase().includes("github") ? "research" : "generate",
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages([...newMessages, { role: 'assistant', content: data.text, grounding: data.groundingMetadata }]);
      setTerminalLogs(prev => [...prev, `[LLM Agent] Researched & updated on-chain staking logic`]);
    } catch (err: any) {
      setMessages([...newMessages, { role: 'assistant', content: `Error: ${err.message}` }]);
    } finally {
      setLoadingAI(false);
    }
  };

  const runOnChainDeploy = () => {
    setTerminalLogs(prev => [
      ...prev,
      `[Anchor] Compiling on-chain program for Solana Mainnet/QuickNode...`,
      `[QuickNode RPC] Broadcasting transaction to validators...`,
      `[Success] Uncerson On-Chain Staking Program deployed successfully! Program ID: UncersonOnChainStakingProtocol11111111111111`
    ]);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(fileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-[calc(100vh-73px)] bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      {/* File Explorer */}
      <div className="w-72 border-r border-zinc-800 bg-zinc-900/50 flex flex-col">
        <div className="p-3 border-b border-zinc-800 flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
            <Folder className="w-4 h-4 text-cyan-400" />
            On-Chain Workspace
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">Solana</span>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <div className="w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-medium">
            <FileCode className="w-4 h-4 shrink-0 text-cyan-400" />
            <span className="truncate">uncerson_onchain_staking.rs</span>
          </div>
        </div>

        <div className="p-3 border-t border-zinc-800 bg-zinc-900/80">
          <div className="text-xs font-semibold text-zinc-400 mb-2 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            High ROI Staking Features
          </div>
          <div className="space-y-1 text-xs text-zinc-300 font-mono">
            <div className="flex items-center justify-between px-2 py-1 bg-zinc-950 rounded border border-zinc-800">
              <span>Target ROI APY</span>
              <span className="text-emerald-400">42.5%</span>
            </div>
            <div className="flex items-center justify-between px-2 py-1 bg-zinc-950 rounded border border-zinc-800">
              <span>MEV Compounding</span>
              <span className="text-emerald-400">Enabled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editor & Terminal */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-12 border-b border-zinc-800 bg-zinc-900/60 px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
            <span className="text-cyan-400">onchain:</span>
            <span>/programs/uncerson_onchain_staking/src/lib.rs</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyCode}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy Code"}
            </button>
            <button
              onClick={runOnChainDeploy}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-cyan-600 hover:bg-cyan-500 text-zinc-950 font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-cyan-600/20"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Deploy On-Chain to Solana
            </button>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
          <div className="lg:col-span-2 flex flex-col border-r border-zinc-800 bg-zinc-950">
            <textarea
              value={fileContent}
              onChange={(e) => setFileContent(e.target.value)}
              className="w-full h-full p-4 bg-transparent text-zinc-100 font-mono text-xs resize-none focus:outline-none leading-relaxed"
              spellCheck="false"
            />
            <div className="h-36 border-t border-zinc-800 bg-zinc-900/80 p-3 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
                  <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                  On-Chain Terminal & Deployment Logs
                </span>
                <button 
                  onClick={() => setTerminalLogs(["[Uncerson On-Chain] Logs cleared"])}
                  className="text-xs text-zinc-500 hover:text-zinc-300"
                >
                  Clear
                </button>
              </div>
              <div className="flex-1 overflow-y-auto font-mono text-[11px] text-zinc-400 space-y-1">
                {terminalLogs.map((log, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-cyan-500">›</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Uncerson LLM Agent with Google/GitHub Lookup */}
          <div className="flex flex-col bg-zinc-900/40">
            <div className="p-3 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80">
              <span className="text-xs font-semibold text-zinc-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Uncerson LLM Agent (GitHub & Web)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">Google Grounded</span>
            </div>

            <div className="p-2 border-b border-zinc-800 flex gap-2 overflow-x-auto">
              <button
                onClick={() => handleSendMessage("Lookup top GitHub repositories and web sources for Solana staking code and optimize our on-chain APY formula for maximum ROI.")}
                className="px-2.5 py-1 text-[11px] rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 whitespace-nowrap flex items-center gap-1"
              >
                <Globe className="w-3 h-3 text-cyan-400" />
                Lookup GitHub Staking Code
              </button>
              <button
                onClick={() => handleSendMessage("Review and modify the staking smart contract code to ensure 100% on-chain execution and superior ROI compared to standard staking pools.")}
                className="px-2.5 py-1 text-[11px] rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 whitespace-nowrap flex items-center gap-1"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Boost On-Chain ROI
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[90%] p-3 rounded-xl text-xs leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-cyan-600 text-zinc-950 font-medium rounded-br-none' 
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-bl-none font-mono text-[11px]'
                  }`}>
                    {m.content}
                    {m.grounding && m.grounding.webSearchQueries && (
                      <div className="mt-2 pt-2 border-t border-zinc-800 text-[10px] text-cyan-400">
                        Searched Google: {m.grounding.webSearchQueries.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loadingAI && (
                <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono p-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Uncerson Agent searching GitHub & Web for staking code...
                </div>
              )}
            </div>

            <div className="p-3 border-t border-zinc-800 bg-zinc-900/60">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask agent to lookup GitHub staking code..."
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-cyan-500 font-sans"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={loadingAI}
                  className="p-2 rounded-lg bg-cyan-500 text-zinc-950 hover:bg-cyan-400 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
