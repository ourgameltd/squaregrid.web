export interface PutBlockRequest {
    title: string;
    claimedBy?: string | null;
    confirmed: boolean;
}

export interface ClaimBlockRequest {
    claimedBy?: string | null;
}
