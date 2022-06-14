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

export const getAssetType = async (
  request: AxiosInstance,
  args: Omit<Asset, 'tokenId' | 'blob'>
) => {
  const { type, ...data } = args;
  await setQuantum(request, args);
  return asset.getAssetType({ type, data });
};

export const getAssetID = async (request: AxiosInstance, args: Asset) => {
  const { type, ...data } = args;
  await setQuantum(request, args);
  return asset.getAssetId({ type, data });
};

export const getAssetTypeAndId = (request: AxiosInstance, args: Asset) => {
  const assetId = getAssetID(request, args);
  const assetType = getAssetType(request, args);
  return { assetId, assetType };
};
