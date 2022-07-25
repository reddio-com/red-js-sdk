// @ts-ignore
import { asset } from '@starkware-industries/starkware-crypto-utils';
import { Asset } from '../types';
import { getContractInfo } from '../api/contractInfo';
import { AxiosInstance } from 'axios';
import assert from 'assert';

const setQuantum = async (request: AxiosInstance, data: Asset) => {
  if (!data.quantum) {
    if (data.type === 'ETH') {
      data.tokenAddress = 'ETH';
    }
    assert(data.tokenAddress, 'tokenAddress is required');
    const { data: res } = await getContractInfo(request, {
      type: data.type,
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
  const { type, ...data } = args;
  (args as any).data = data;
  const assetId = await getAssetID(args);
  const assetType = await getAssetType(args);
  return { assetId, assetType };
};
