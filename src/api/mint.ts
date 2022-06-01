import reddio from '../core';
import { RequestCommonParams } from '../types/common';

interface MintParams extends RequestCommonParams {
  amount: number;
}

export const mintERC20 = async (data: MintParams) => {
  const { address, starkKey, amount } = data;
  return reddio.request.post('/api/v1/mint', {
    address,
    amount,
    stark_key: starkKey,
  });
};
