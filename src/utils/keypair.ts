// @ts-ignore
import { keyDerivation } from '@starkware-industries/starkware-crypto-utils';
import { JsonRpcProvider } from '@ethersproject/providers';

export const generateFromEthSignature = async (
  provider: JsonRpcProvider,
  content: string | Record<string, any>
) => {
  const method = 'eth_signTypedData_v4';
  const from = await provider.getSigner().getAddress();
  const value =
    typeof content === 'string'
      ? {
          domain: {
            chainId: 5,
          },
          message: {
            contents: content,
          },
          primaryType: 'reddio',
          types: {
            EIP712Domain: [{ name: 'chainId', type: 'uint256' }],
            reddio: [{ name: 'contents', type: 'string' }],
          },
        }
      : JSON.stringify(content);
  const msgParams = JSON.stringify(value);
  const result = await provider.send(method, [from, msgParams]);
  const privateKey: string = keyDerivation.getPrivateKeyFromEthSignature(
    result
  );
  const publicKey = '0x' + keyDerivation.privateToStarkKey(privateKey);
  return { privateKey, publicKey };
};
