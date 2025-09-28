import { NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { seiDevnet } from 'viem/chains';
import { GAMES } from '@/lib/games'; // 导入我们已有的游戏数据
import { contractConfig } from '@/lib/contracts'; // 导入我们已有的合约配置

// 创建一个到 Sei 测试网的连接
const publicClient = createPublicClient({
  chain: seiDevnet,
  transport: http("https://evm-rpc-atlantic-2.seinetwork.io"),
});

export async function GET(
  request: Request,
  { params }: { params: { tokenId: string } }
) {
  const tokenId = BigInt(params.tokenId);

  try {
    // **关键步骤**: 调用我们智能合约上的 `tokenIdToGameId` 函数
    // 来查询这个 NFT 对应的是哪个游戏
    const gameId = await publicClient.readContract({
      address: contractConfig.address,
      abi: contractConfig.abi,
      functionName: 'tokenIdToGameId',
      args: [tokenId],
    });
    
    // 从我们的游戏列表里找到对应的游戏信息
    // 注意：合约里的 gameId 是从 1 开始的数字，而数组索引是从 0 开始的
    const game = GAMES.find(g => parseInt(g.id.replace('g', '')) === Number(gameId));

    if (!game) {
      return NextResponse.json({ error: 'Game not found for this token' }, { status: 404 });
    }

    // 构造并返回符合 OpenSea 标准的元数据
    const metadata = {
      name: `${game.title} #${tokenId.toString()}`,
      description: `A collectible NFT for the game ${game.title}.`,
      image: game.cover, // 使用游戏的封面图作为 NFT 图片
      attributes: [
        {
          trait_type: 'Rating',
          value: game.rating.toString(),
        },
        ...game.tags.map(tag => ({
          trait_type: 'Tag',
          value: tag,
        })),
      ],
    };

    return NextResponse.json(metadata);

  } catch (error) {
    console.error(`Error fetching metadata for token ${tokenId}:`, error);
    return NextResponse.json({ error: 'Failed to fetch metadata' }, { status: 500 });
  }
}
