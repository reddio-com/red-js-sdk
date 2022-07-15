// @ts-ignore
import { asset } from '@starkware-industries/starkware-crypto-utils';
import { Asset } from '../types';
import { getContractInfo } from '../api/contractInfo';
import { AxiosInstance } from 'axios';

const setQuantum = async (request: AxiosInstance, data: Asset) => {
  if (!data.quantum && data.tokenAddress) {
    const { data: res } = await getContractInfo(request, {
      contractAddress: data.tokenAddress,
    });
    data.quantum = res.data.quantum;
  }
};

export const getTokenType = (args: Omit<Asset, 'tokenId' | 'blob'>) => {
  const { type, ...data } = args;
  return asset.getAssetType({ type, data });
};

export const getTokenID = async (args: Asset) => {
  const { type, ...data } = args;
  return asset.getAssetId({ type, data });
};

export const getTokenTypeAndId = async (
  request: AxiosInstance,
  args: Asset
) => {
  await setQuantum(request, args);
  const tokenId = await getTokenID(args);
  const tokenType = await getTokenType(args);
  return { tokenId, tokenType };
};
