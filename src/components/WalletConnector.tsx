'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useState } from 'react';
import Image from 'next/image'; // **关键修正**: 导入 Next.js 的 Image 组件

export default function WalletConnector() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConnectClick = () => {
    if (connectors.length === 1) {
      connect({ connector: connectors[0] });
    } else {
      setIsModalOpen(true);
    }
  };

  const shortenAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  if (isConnected && address) {
    return (
      <button 
        onClick={() => disconnect()}
        className="px-4 py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors w-[150px]"
      >
        {shortenAddress(address)}
      </button>
    );
  }

  return (
    <>
      <button 
        onClick={handleConnectClick}
        disabled={isPending}
        className="px-4 py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors w-[150px] disabled:opacity-50"
      >
        {isPending ? 'Connecting...' : 'Connect Wallet'}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Choose a wallet</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-2xl">&times;</button>
            </div>
            <div className="space-y-3">
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => {
                    connect({ connector });
                    setIsModalOpen(false);
                  }}
                  className="w-full flex items-center p-3 rounded-md bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  {connector.icon && (
                    // **关键修正**: 使用 Next.js 的 Image 组件来优化图标
                    <Image src={connector.icon} alt={connector.name} width={24} height={24} className="mr-3" />
                  )}
                  <span>{connector.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

