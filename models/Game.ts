import { Block } from './Block';

export interface Game {
    partitionKey: string;
    rowKey: string;
    title: string;
    image?: string;
    description: string;
    blocks: Block[];
    blockCount: number;
    isClaimed: boolean;
    claimedBlockCount: number;
    percentageClaimed: number;
    isCompleted: boolean;
    isWon: boolean;
    wonById?: string; 
    wonByName?: string;
    wonByDate?: Date;
    timestamp?: Date;
    eTag: string;
}

export interface GameFormModel extends Game {
    blockInput: string;
    imageUpload: FileList;
}
