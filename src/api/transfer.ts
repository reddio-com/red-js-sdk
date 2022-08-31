import { AxiosInstance } from 'axios';
import { parseParams, signTransfer } from '../utils';
import { getNonce } from './nonce';
import {
  TransferResponse,
  TransferRequestParams,
  Response,
  SignTransferParams,
} from '../types';
import { ethers } from 'ethers';

export const getTransferParams = async (
  request: AxiosInstance,
  data: SignTransferParams
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
    signature: signTransfer(nonce, data),
    nonce,
  };
  delete params.privateKey;
  return params;
};

export const transfer = async (
  request: AxiosInstance,
  data: SignTransferParams
) => {
  const params = await getTransferParams(request, data);
  return request.post<Response<TransferResponse>>('/v1/transfers', {
    ...parseParams(params),
  });
};
