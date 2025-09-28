'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 这些类型是从 @sei-js/evm 包中复制出来的，因为我们不能直接导入
interface SeiWallet {
  getAccounts: () => Promise<string[]>;
  connect: () => Promise<string[]>;
}

interface SeiWalletContextType {
  wallet: SeiWallet | null;
  address: string | null;
  isLoading: boolean;
  connect: () => Promise<void>;
}

const SeiWalletContext = createContext<SeiWalletContextType | undefined>(undefined);

export const SeiWalletProvider = ({ children }: { children: ReactNode }) => {
  const [wallet, setWallet] = useState<SeiWallet | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initWallet = async () => {
      try {
        // **关键改动**：只在客户端动态导入库
        const { getSeiWallet } = await import('@sei-js/evm');
        const seiWallet = await getSeiWallet();
        setWallet(seiWallet);
        const accounts = await seiWallet.getAccounts();
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        }
      } catch (e) {
        console.error("Could not initialize Sei wallet", e);
      } finally {
        setIsLoading(false);
      }
    };

    // 确保只在浏览器环境中运行
    if (typeof window !== 'undefined') {
        initWallet();
    }
  }, []);

  const connect = async () => {
    if (!wallet) {
      alert("Sei wallet is not ready. Please try again.");
      return;
    }
    try {
      const accounts = await wallet.connect();
      if (accounts.length > 0) {
        setAddress(accounts[0]);
      }
    } catch (e) {
      console.error("Failed to connect", e);
    }
  };

  return (
    <SeiWalletContext.Provider value={{ wallet, address, isLoading, connect }}>
      {children}
    </SeiWalletContext.Provider>
  );
};

export const useSeiWallet = () => {
  const context = useContext(SeiWalletContext);
  if (context === undefined) {
    throw new Error('useSeiWallet must be used within a SeiWalletProvider');
  }
  return context;
};