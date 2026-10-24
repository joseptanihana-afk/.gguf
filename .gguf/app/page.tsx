'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import IdWorkspace from '@/components/IdWorkspace';
import StakingDashboard from '@/components/StakingDashboard';
import RpcClusterMonitor from '@/components/RpcClusterMonitor';
import PluginManager from '@/components/PluginManager';
import Web3Connector from '@/components/Web3Connector';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'ide' | 'staking' | 'rpc' | 'plugins' | 'web3'>('ide');

  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col font-sans selection:bg-cyan-500 selection:text-zinc-950">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'ide' && <IdWorkspace />}
      {activeTab === 'staking' && <StakingDashboard />}
      {activeTab === 'web3' && <Web3Connector />}
      {activeTab === 'rpc' && <RpcClusterMonitor />}
      {activeTab === 'plugins' && <PluginManager />}
    </main>
  );
}
