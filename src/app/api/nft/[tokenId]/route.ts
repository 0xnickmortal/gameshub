import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { seiDevnet } from 'viem/chains';
import { GAMES } from '@/lib/games';
import { contractConfig } from '@/lib/contracts';

const publicClient = createPublicClient({
  chain: seiDevnet,
  transport: http("https://evm-rpc-atlantic-2.seinetwork.io"),
});

// **关键修正**: 更新函数签名以匹配 Next.js 的期望类型
export async function GET(
  request: NextRequest, // 使用 NextRequest 类型
  { params }: { params: { tokenId: string } }
) {
  const tokenId = BigInt(params.tokenId);

  try {
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

  } catch (error) {
    console.error(`Error fetching metadata for token ${tokenId}:`, error);
    return NextResponse.json({ error: 'Failed to fetch metadata' }, { status: 500 });
  }
}

