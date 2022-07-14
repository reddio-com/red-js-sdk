export interface RequestCommonParams {
  // ETH 可不传
  address?: string;
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

export interface SignParams {
  starkKey: string;
  privateKey: string;
  assetId: string;
  amount: number | string;
  vaultId: string;
  receiver: string;
  receiverVaultId: string;
  expirationTimestamp: number;
}
