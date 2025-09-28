import { type NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { seiDevnet } from 'viem/chains';
import { GAMES } from '@/lib/games';
import { contractConfig } from '@/lib/contracts';

const publicClient = createPublicClient({
  chain: seiDevnet,
  transport: http("https://evm-rpc-atlantic-2.seinetwork.io"),
});

type RouteContext = {
  params: {
    tokenId: string;
  };
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { tokenId: tokenIdString } = context.params;
    const tokenId = BigInt(tokenIdString);

    const gameId = await publicClient.readContract({
      address: contractConfig.address,
      abi: contractConfig.abi,
      functionName: 'tokenIdToGameId',
      args: [tokenId],
    });
    
    const game = GAMES.find(g => parseInt(g.id.replace('g', '')) === Number(gameId));

    if (!game) {
      return NextResponse.json({ error: 'Game not found for this token' }, { status: 404 });
    }

    const metadata = {
      name: `${game.title} #${tokenId.toString()}`,
      description: `A collectible NFT for the game ${game.title}.`,
      image: game.cover,
      attributes: [
        { trait_type: 'Rating', value: game.rating.toString() },
        ...game.tags.map(tag => ({ trait_type: 'Tag', value: tag })),
      ],
    };

    return NextResponse.json(metadata);

  } catch (error: unknown) { // **关键修正**: 将 'any' 类型改为更安全的 'unknown'
    console.error(`Error fetching metadata:`, error);
    
    // **代码质量提升**: 增加类型检查，确保我们能安全地访问错误信息
    let errorMessage = 'An unexpected error occurred.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: 'Failed to fetch metadata', details: errorMessage }, { status: 500 });
  }
}

