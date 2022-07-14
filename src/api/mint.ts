import { AxiosInstance } from 'axios';
import { Response, MintResponse, MintOneParams } from '../types';
import { parseParams } from '../utils';

export async function mintOne(request: AxiosInstance, params: MintOneParams) {
  return request.post<Response<MintResponse>>('/api/v1/mint', {
    amount: '1',
    ...parseParams(params),
  });
}

// mint 好多个没做完
