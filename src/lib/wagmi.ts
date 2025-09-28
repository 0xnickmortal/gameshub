import { http, createConfig } from 'wagmi';
import { sei, seiDevnet } from 'wagmi/chains';

// 从新安装的包里导入 "injected" 连接器，它专门用于连接 MetaMask 等浏览器插件钱包
import { injected } from '@wagmi/connectors';

// 在应用的顶层导入这个包，它会自动注册 Sei Global Wallet
import '@sei-js/sei-global-wallet/eip6963';

export const config = createConfig({
  chains: [sei, seiDevnet],
  
  // **关键改动**: 添加 connectors 数组，明确告诉 wagmi 我们支持哪些钱包
  connectors: [
    injected(), // 添加 injected 连接器，它会自动识别 MetaMask
  ],

  multiInjectedProviderDiscovery: true, // 继续启用 EIP-6963 支持，以发现 Sei Global Wallet 等
  transports: {
    [sei.id]: http(),
    [seiDevnet.id]: http(),
  },
});

