import { AxiosInstance } from 'axios';
import {
  getTransferMsgHash,
  sign,
  ec,
  // @ts-ignore
} from '@starkware-industries/starkware-crypto-utils';
import { Response } from '../types/common';
import { parseParams } from '../utils/common';
import { getNonce } from './nonce';
import {
  TransferParams,
  TransferResponse,
  TransferRequestParams,
} from '../types/api';

export const transfer = async (
  request: AxiosInstance,
  data: TransferParams
) => {
  const {
    starkKey,
    privateKey,
    assetId,
    amount,
    vaultId,
    receiver,
    receiverVaultId,
    expirationTimestamp,
  } = data;
  const { data: result } = await getNonce(request, { starkKey });
  const msgHash = getTransferMsgHash(
    amount,
    result.data.nonce,
    vaultId,
    assetId,
    receiverVaultId,
    receiver,
    expirationTimestamp
  );
  const keyPair = ec.keyFromPrivate(privateKey, 'hex');
  const msgSignature = sign(keyPair, msgHash);
  const { r, s } = msgSignature;
  const params: TransferRequestParams = {
    ...data,
    receiver: receiver.toLowerCase(),
    signature: {
      r: '0x' + r.toString(16),
      s: '0x' + s.toString(16),
    },
    nonce: result.data.nonce,
  };
  delete params.privateKey;
  return request.post<Response<TransferResponse>>('/api/v1/transfer', {
    ...parseParams(params),
  });
};
