import { AxiosInstance } from 'axios';
import { Response } from '../types/common';
import { parseParams } from '../utils/common';
import { VaultParams, VaultResponse } from '../types/api';

const getVaultID = async (request: AxiosInstance, params: VaultParams) => {
  return request.get<Response<VaultResponse>>('/api/v1/vault', {
    params: {
      ...parseParams(params),
    },
  });
};

export { getVaultID };
