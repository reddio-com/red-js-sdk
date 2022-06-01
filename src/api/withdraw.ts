import reddio from '../core';
import { RequestCommonParams, Response } from '../types/common';

interface WithdrawParams extends RequestCommonParams {
  amount: number;
  tokenId: string;
}

interface WithdrawResponse {
  txid: number;
}

export const withdraw = async (data: WithdrawParams) => {
  const { address, starkKey, amount, tokenId } = data;
  return reddio.request.post<Response<WithdrawResponse>>('/api/v1/withdraw', {
    address,
    amount,
    stark_key: starkKey,
    token_id: tokenId,
  });
};
