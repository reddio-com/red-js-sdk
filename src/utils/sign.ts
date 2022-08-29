import {
  getTransferMsgHash,
  sign as starkexSign,
  ec,
  // @ts-ignore
} from '@starkware-industries/starkware-crypto-utils';
import { SignParams } from '../types';

export const sign = (nonce: number, data: SignParams) => {
  const {
    privateKey,
    assetId,
    amount,
    vaultId,
    receiver,
    receiverVaultId,
    expirationTimestamp = 4194303,
  } = data;
  if (data.privateKey.startsWith('0x')) {
    data.privateKey = data.privateKey.substring(2);
  }
  const msgHash = getTransferMsgHash(
    amount,
    nonce,
    vaultId,
    assetId,
    receiverVaultId,
    receiver,
    expirationTimestamp
  );
  const keyPair = ec.keyFromPrivate(privateKey, 'hex');
  const msgSignature = starkexSign(keyPair, msgHash);
  const { r, s } = msgSignature;
  return {
    r: '0x' + r.toString(16),
    s: '0x' + s.toString(16),
  };
};
