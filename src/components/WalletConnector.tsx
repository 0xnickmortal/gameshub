'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useState } from 'react';

export default function WalletConnector() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConnectClick = () => {
    // 如果只有一个连接器可用（比如只有Sei Global Wallet），就直接连接
    if (connectors.length === 1) {
      connect({ connector: connectors[0] });
    } else {
      // 否则，打开钱包选择模态框
      setIsModalOpen(true);
    }
  };

  const shortenAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  // 场景1: 已连接钱包
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

  // 场景2: 未连接钱包
  return (
    <>
      <button 
        onClick={handleConnectClick}
        disabled={isPending}
        className="px-4 py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors w-[150px] disabled:opacity-50"
      >
        {isPending ? '连接中...' : 'Connect Wallet'}
      </button>

      {/* 钱包选择模态框 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">选择一个钱包</h2>
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
                  {/* 您可以为不同的钱包准备不同的图标，这里我们先用一个通用图标 */}
                  <span className="text-lg mr-3">{connector.icon ? <img src={connector.icon} alt={connector.name} className="w-6 h-6" /> : '🌐'}</span>
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

