// @ts-ignore
import { keyDerivation } from '@starkware-industries/starkware-crypto-utils';
import { JsonRpcProvider } from '@ethersproject/providers';

export const generateFromEthSignature = async (
  provider: JsonRpcProvider,
  msgParams: any
) => {
  const method = 'eth_signTypedData_v4';
  const from = await provider.getSigner().getAddress();
  const result = await provider.send(method, [from, msgParams]);
  const privateKey = keyDerivation.getPrivateKeyFromEthSignature(result);
  const publicKey = '0x' + keyDerivation.privateToStarkKey(privateKey);
  return { privateKey, publicKey };
};
