'use client';

import { WagmiProvider } from 'wagmi';
import { config } from '@/lib/wagmi';
import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function AppProviders({ children }: { children: ReactNode }) {
  // 创建一个 QueryClient 实例
  const [queryClient] = useState(() => new QueryClient());

  return (
    // 使用 QueryClientProvider 包裹 WagmiProvider
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        {children}
      </WagmiProvider>
    </QueryClientProvider>
  );
}

