// @ts-ignore
import { keyDerivation } from '@starkware-industries/starkware-crypto-utils';
import reddio from '../core';

export const getKeys = async (from: string, msgParams: any) => {
  const method = 'eth_signTypedData_v4';
  const result = await reddio.provider.send(method, [from, msgParams]);
  const privateKey = keyDerivation.getPrivateKeyFromEthSignature(result);
  const publicKey = '0x' + keyDerivation.privateToStarkKey(privateKey);
  return { privateKey, publicKey };
};
