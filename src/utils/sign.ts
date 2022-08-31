import {
  getTransferMsgHash,
  getLimitOrderMsgHashWithFee,
  sign as starkexSign,
  ec,
  // @ts-ignore
} from '@starkware-industries/starkware-crypto-utils';
import { SignOrderParams, SignTransferParams } from '../types';

export const signTransfer = (nonce: number, data: SignTransferParams) => {
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

export const signOrder = (data: SignOrderParams) => {
  const {
    expirationTimestamp,
    nonce,
    feeVaultId,
    feeToken,
    tokenBuy,
    amountBuy,
    feeLimit,
    tokenSell,
    amountSell,
    vaultIdSell,
    vaultIdBuy,
  } = data;
  if (data.privateKey.startsWith('0x')) {
    data.privateKey = data.privateKey.substring(2);
  }
  const msgHash = getLimitOrderMsgHashWithFee(
    vaultIdSell,
    vaultIdBuy,
    amountSell,
    amountBuy,
    tokenSell,
    tokenBuy,
    nonce,
    expirationTimestamp,
    feeToken,
    feeVaultId,
    feeLimit
  );
  const keyPair = ec.keyFromPrivate(data.privateKey, 'hex');
  const msgSignature = starkexSign(keyPair, msgHash);
  const { r, s } = msgSignature;
  return {
    r: '0x' + r.toString(16),
    s: '0x' + s.toString(16),
  };
};
