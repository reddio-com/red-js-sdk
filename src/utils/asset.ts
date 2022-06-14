// @ts-ignore
import { asset } from '@starkware-industries/starkware-crypto-utils';
import { Asset } from '../types';
import { getContractInfo } from '../api/contractInfo';
import { AxiosInstance } from 'axios';

const setQuantum = async (request: AxiosInstance, data: Asset) => {
  if (!data.quantum) {
    const { data: res } = await getContractInfo(request, {
      contractAddress: data.tokenAddress,
    });
    data.quantum = res.data.quantum;
  }
};

export const getAssetType = (args: Omit<Asset, 'tokenId' | 'blob'>) => {
  const { type, ...data } = args;
  return asset.getAssetType({ type, data });
};

export const getAssetID = async (args: Asset) => {
  const { type, ...data } = args;
  return asset.getAssetId({ type, data });
};

export const getAssetTypeAndId = async (
  request: AxiosInstance,
  args: Asset
) => {
  await setQuantum(request, args);
  const assetId = await getAssetID(args);
  const assetType = await getAssetType(args);
  return { assetId, assetType };
};
