export interface SubmitData {
  addressOfCreator: string;
  image: string;
  likesAmount: number;
  tokenID: number;
  chainId: number;
  voterWallets: string[];
}

export interface VoteData {
  tokenID: number;
  wallet: string;
}
