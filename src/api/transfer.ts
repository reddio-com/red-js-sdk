import reddio from '../core';
import { Response, SignatureLike } from '../types/common';
import { parseParams } from '../utils/common';

interface TransferParams {
  starkKey: string;
  tokenId: string;
  amount: number;
  nonce: number;
  vaultId: number;
  receiver: string;
  receiverVaultId: number;
  expirationTimestamp: number;
  signature: SignatureLike;
}

interface TransferResponse {
  transaction_id: number;
}

export const transfer = async (data: TransferParams) => {
  return reddio.request.post<Response<TransferResponse>>('/api/v1/transfer', {
    ...parseParams(data),
  });
};
