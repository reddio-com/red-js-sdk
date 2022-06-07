import { AxiosInstance } from 'axios';
import { Response } from '../types/common';
import { parseParams } from '../utils/common';
import { MintResponse, MintParams } from '../types/api';

export async function mintERC20(request: AxiosInstance, params: MintParams) {
  return request.post<Response<MintResponse>>('/api/v1/mint', {
    ...parseParams(params),
  });
}
