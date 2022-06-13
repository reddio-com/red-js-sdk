import { AxiosInstance } from 'axios';
import { parseParams, sign } from '../utils';
import { getNonce } from './nonce';
import {
  TransferResponse,
  TransferRequestParams,
  Response,
  SignParams,
} from '../types';

export const transfer = async (request: AxiosInstance, data: SignParams) => {
  const { starkKey, receiver } = data;
  const { data: result } = await getNonce(request, { starkKey });
  const nonce = result.data.nonce;
  const params: TransferRequestParams = {
    ...data,
    receiver: receiver.toLowerCase(),
    signature: sign(nonce, data),
    nonce,
  };
  delete params.privateKey;
  return request.post<Response<TransferResponse>>('/api/v1/transfer', {
    ...parseParams(params),
  });
};
