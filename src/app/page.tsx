'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { GAMES, Game } from '@/lib/games';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useAccount, useWriteContract } from 'wagmi';
import { contractConfig } from '@/lib/contracts';
// **关键修正**: 移除了未被使用的 `parseGwei`

// --- 动态导入钱包按钮 ---
const WalletConnector = dynamic(() => import('@/components/WalletConnector'), {
  ssr: false,
  loading: () => <button disabled className="px-4 py-2 rounded-full bg-indigo-500 text-white font-semibold opacity-50 cursor-not-allowed w-[150px]">Loading...</button>
});

// --- 游戏卡片组件 ---
const GameCard = ({ game, className = '', onMint }: { game: Game, className?: string, onMint: (gameId: number) => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { isConnected } = useAccount();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMouseEnter = () => videoRef.current?.play().catch(() => {});
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  const gameIdNumber = parseInt(game.id.replace('g', ''));

  return (
    <div
      className={`game-card group rounded-xl overflow-hidden shadow-lg transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-2xl cursor-pointer bg-slate-200 dark:bg-slate-800 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
    >
      <div className="relative w-full h-full aspect-[16/9] overflow-hidden">
        <Image
          src={game.cover}
          alt={`${game.title} cover`}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
          className={`object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
        />
        <video
          ref={videoRef}
          src={game.preview}
          className={`object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
          loop
          muted
          playsInline
          preload="metadata"
        />
         <div className="card-info absolute bottom-0 left-0 right-0 p-2 md:p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex flex-col justify-end h-full">
          <div className="mt-auto">
            <h3 className="font-bold text-sm md:text-lg truncate">{game.title}</h3>
            <div className="flex justify-between items-center mt-1">
              <div className="flex flex-wrap gap-1">
                {game.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-xs bg-white/20 rounded-full px-2 py-0.5">{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-1 text-xs md:text-sm font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-amber-400">
                  <path fillRule="evenodd" d="M10.868 2.884c.321-.772 1.305-.772 1.626 0l1.436 3.465a1.25 1.25 0 00.942.686l3.61.524c.806.117 1.128 1.107.548 1.668l-2.61 2.544a1.25 1.25 0 00-.362 1.103l.616 3.595c.138.803-.704 1.42-1.42.998L11.69 15.24a1.25 1.25 0 00-1.38 0l-3.224 1.695c-.716.422-1.558-.195-1.42-.998l.616-3.595a1.25 1.25 0 00-.362-1.103l-2.61-2.544c-.58-.561-.258-1.551.548-1.668l3.61-.524a1.25 1.25 0 00.942.686l1.436-3.465z" clipRule="evenodd" />
                </svg>
                {game.rating}
              </div>
            </div>
          </div>
          {isClient && isConnected && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMint(gameIdNumber);
              }}
              className="mt-2 w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors opacity-0 group-hover:opacity-100"
            >
              Mint Game NFT
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


// --- 主页面 ---
export default function HomePage() {
  const [filters, setFilters] = useState({ search: '', tags: new Set<string>(), sort: 'trending' });
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const handleMint = (gameId: number) => {
    console.log(`Attempting to mint game with ID: ${gameId}`);
    writeContract({
      address: contractConfig.address,
      abi: contractConfig.abi,
      functionName: 'mintGame',
      args: [BigInt(gameId)],
      gas: BigInt(200000),
    });
  };

  const filteredGames = useMemo(() => {
    let games = [...GAMES];
    if (filters.search) games = games.filter(g => g.title.toLowerCase().includes(filters.search.toLowerCase()));
    if (filters.tags.size > 0) games = games.filter(g => [...filters.tags].every(tag => g.tags.includes(tag)));
    if (filters.sort === 'rating') games.sort((a, b) => b.rating - a.rating);
    if (filters.sort === 'newest') games.reverse();
    return games;
  }, [filters]);
  
  const getCardLayoutClass = (index: number) => {
    const pattern = [
      'col-span-2 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 
      'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-2 row-span-2'
    ];
    return pattern[index % pattern.length] || 'col-span-1 row-span-1';
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg">
        <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold">🎮 GamesHub</div>
          <div className="flex items-center gap-4">
            <input type="search" placeholder="Search..." className="hidden md:block w-72 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800" onChange={e => setFilters(f => ({ ...f, search: e.target.value }))} />
            <WalletConnector />
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-6 py-8">
        {isPending && <div className="text-center p-4 mb-4 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg">正在铸造 NFT... 请在钱包中确认交易</div>}
        {hash && <div className="text-center p-4 mb-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg break-words">铸造成功！交易哈希: {hash}</div>}
        {error && <div className="text-center p-4 mb-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">铸造失败: {error.shortMessage || error.message}</div>}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 grid-flow-dense" style={{gridAutoRows: 'minmax(0, auto)'}}>
          {filteredGames.map((game, index) => (
            <GameCard key={game.id} game={game} className={getCardLayoutClass(index)} onMint={handleMint} />
          ))}
        </div>
      </main>
    </div>
  );
}

