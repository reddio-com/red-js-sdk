import reddio from '../core';
import { RequestCommonParams, Response } from '../types/common';
import { parseParams } from '../utils/common';

interface VaultParams extends RequestCommonParams {
  tokenId?: string;
}

interface VaultResponse {
  vault_id: number;
}

const getVaultID = async (params: VaultParams) => {
  return reddio.request.get<Response<VaultResponse>>('/api/v1/vault', {
    params: {
      ...parseParams(params),
    },
  });
};

export { getVaultID };
