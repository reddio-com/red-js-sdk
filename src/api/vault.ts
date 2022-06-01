import reddio from '../core';
import { RequestCommonParams, Response } from '../types/common';

interface VaultParams extends RequestCommonParams {
  tokenId?: string;
}

interface VaultResponse {
  vault_id: number;
}

const getVaultID = async (params: VaultParams) => {
  const { address, starkKey, tokenId } = params;
  return reddio.request.get<Response<VaultResponse>>('/api/v1/vault', {
    params: {
      address,
      stark_key: starkKey,
      token_id: tokenId,
    },
  });
};

export { getVaultID };
