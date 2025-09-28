import { type NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { seiDevnet } from 'viem/chains';
import { GAMES } from '@/lib/games';
import { contractConfig } from '@/lib/contracts';

const publicClient = createPublicClient({
  chain: seiDevnet,
  transport: http("https://evm-rpc-atlantic-2.seinetwork.io"),
});

// **最终修正**: 明确定义 context 的类型，以处理 Vercel 构建环境中的特殊情况
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

  } catch (error: any) {
    console.error(`Error fetching metadata:`, error);
    // 返回一个更通用的错误信息
    return NextResponse.json({ error: 'Failed to fetch metadata', details: error.message }, { status: 500 });
  }
}

