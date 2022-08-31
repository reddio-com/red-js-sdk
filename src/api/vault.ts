import { AxiosInstance } from 'axios';
import { Response, VaultParams, VaultResponse } from '../types';
import { parseParams } from '../utils';

const getVaultID = async (request: AxiosInstance, params: VaultParams) => {
  if (Array.isArray(params.starkKeys)) {
    params.starkKeys = params.starkKeys.join(',');
  }
  if (Array.isArray(params.assetId)) {
    params.assetId = params.assetId.join(',');
  }
  return request.get<Response<VaultResponse>>('/v1/vaults', {
    params: {
      ...parseParams(params),
    },
  });
};

export { getVaultID };
