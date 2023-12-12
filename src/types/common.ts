import type { Client as WagmiClient } from '@wagmi/core';
import { Types } from '../utils';

export interface RequestCommonParams {
  // ETH 可不传
  contractAddress?: string;
  starkKey: string;
}

export interface SequenceIdResponse {
  sequence_id: number;
}


export type StarkKeyParams = Pick<RequestCommonParams, 'starkKey'>;

export interface Response<T> {
  data: T;
  status: string;
  error: string;
}

export interface PaginateResponse<T> {
  data: {
    list: T,
    total: number,
  };
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
  amount?: number | string;
  contractAddress?: string;
  tokenUrl?: string;
  tokenId?: string | number;
  type: `${Types}`;
  receiver: string;
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

export type Client = WagmiClient<any, any>;
