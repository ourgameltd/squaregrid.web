export interface Block {
    partitionKey: string;
    rowKey: string;
    title: string;
    index: number;
    claimedByUserId?: string;
    claimedByFriendlyName?: string;
    dateClaimed?: Date;
    isClaimed: boolean;
    dateConfirmed?: Date;
    isConfirmed: boolean;
    isWinner: boolean;
    timestamp?: Date;
    eTag: string;
}
