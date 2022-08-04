import { AxiosInstance } from 'axios';
import { parseParams, sign } from '../utils';
import { getNonce } from './nonce';
import {
  TransferResponse,
  TransferRequestParams,
  Response,
  SignParams,
} from '../types';
import { ethers } from 'ethers';

export const getTransferParams = async (
  request: AxiosInstance,
  data: SignParams
) => {
  const { starkKey, receiver, expirationTimestamp = 4194303 } = data;
  const { data: result } = await getNonce(request, { starkKey });
  const nonce = result.data.nonce;
  if (!data.amount) {
    data.amount = '1';
  } else {
    data.amount = ethers.utils.parseUnits(data.amount.toString(), 6).toString();
  }
  const params: TransferRequestParams = {
    ...data,
    expirationTimestamp,
    receiver,
    signature: sign(nonce, data),
    nonce,
  };
  delete params.privateKey;
  return params;
};

export const transfer = async (request: AxiosInstance, data: SignParams) => {
  const params = await getTransferParams(request, data);
  return request.post<Response<TransferResponse>>('/v1/transfers', {
    ...parseParams(params),
  });
};
