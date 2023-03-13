// @eslint-ignore
import { keyDerivation } from '@starkware-industries/starkware-crypto-utils';
import { signTypedData } from '@wagmi/core';

export const generateFromEthSignature = async (
  env: 'test' | 'main',
  domain = 'reddio',
) => {
  const value = {
    domain: {
      chainId: env === 'test' ? 5 : 1,
    },
    message: {
      contents: 'Generate layer 2 key',
    },
    types: {
      EIP712Domain: [{ name: 'chainId', type: 'uint256' }],
      [domain]: [{ name: 'contents', type: 'string' }],
    } as any,
  };
  const result = await signTypedData({
    domain: value.domain,
    value: value.message,
    types: value.types,
  });
  const privateKey: string = keyDerivation.getPrivateKeyFromEthSignature(
    result,
  );
  const publicKey = `0x${keyDerivation.privateToStarkKey(privateKey)}`;
  return { privateKey, publicKey };
};
