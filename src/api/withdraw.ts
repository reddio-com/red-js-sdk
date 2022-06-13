import { AxiosInstance } from 'axios';
import { Response, SignParams } from '../types';
import { parseParams } from '../utils';
import { TransferRequestParams, WithdrawResponse } from '../types';
import { getNonce } from './nonce';
import { sign } from '../utils';

export const withdraw = async (request: AxiosInstance, data: SignParams) => {
  const { starkKey, receiver } = data;
  const { data: result } = await getNonce(request, { starkKey });
  const nonce = result.data.nonce;
  const params: TransferRequestParams = {
    ...data,
    receiver: receiver.toLowerCase(),
    signature: sign(nonce, data),
    nonce,
  };
  return request.post<Response<WithdrawResponse>>('/api/v1/withdrawto', {
    ...parseParams(params),
  });
};
