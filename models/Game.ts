interface Game {
    partitionKey: string;
    rowKey: string;
    title: string;
    image: string;
    description: string;
    published: boolean;
    blocks: number;
    blocksClaimed: number;
    blocksRemaining: number;
    isCompleted: boolean;
    isWon: boolean;
    timestamp: string;
    eTag: string;
  }