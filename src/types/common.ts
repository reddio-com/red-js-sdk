export interface RequestCommonParams {
  // ETH 可不传
  contractAddress?: string;
  starkKey: string;
}

export type StarkKeyParams = Pick<RequestCommonParams, 'starkKey'>;

export interface Response<T> {
  data: T;
  status: string;
  error: string;
}

export type SignatureLike = {
  r: string;
  s: string;
};

export interface SignTransferParams {
  starkKey: string;
  privateKey: string;
  assetId: string;
  amount?: number | string;
  vaultId: string;
  receiver: string;
  receiverVaultId: string;
  expirationTimestamp?: number;
}

export interface SignOrderParams {
  vaultIdSell: string;
  vaultIdBuy: string;
  amountSell: string;
  amountBuy: string;
  tokenSell: string;
  tokenBuy: string;
  nonce: number;
  expirationTimestamp: number;
  feeToken: string;
  feeVaultId: number;
  feeLimit: number;
  privateKey: string;
}

export interface PageParams {
  page: number;
  limit: number;
}
