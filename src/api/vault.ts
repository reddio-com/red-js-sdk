import { AxiosInstance } from 'axios';
import { Response, VaultParams, VaultResponse } from '../types';
import { parseParams } from '../utils';

const getVaultID = async (request: AxiosInstance, params: VaultParams) => {
  if (Array.isArray(params.starkKey)) {
    params.starkKey = params.starkKey.join(',');
  }
  return request.get<Response<VaultResponse>>('/api/v1/vault', {
    params: {
      ...parseParams(params),
    },
  });
};

export { getVaultID };
