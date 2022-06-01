import reddio from '../core';
import { RequestCommonParams } from '../types/common';

type NonceParams = Pick<RequestCommonParams, 'starkKey'>;

export const getNonce = async (data: NonceParams) => {
  const { starkKey } = data;
  return reddio.request.get('/api/v1/nonce', {
    params: {
      stark_key: starkKey,
    },
  });
};
