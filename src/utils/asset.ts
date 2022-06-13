// @ts-ignore
import { asset } from '@starkware-industries/starkware-crypto-utils';
import { Asset } from '../types/asset';

export const getAssetType = (args: Omit<Asset, 'tokenId' | 'blob'>) => {
  const { type, ...data } = args;
  return asset.getAssetType({ type, data });
};

export const getAssetID = (args: Asset) => {
  const { type, ...data } = args;
  return asset.getAssetId({ type, data });
};

export const getAssetTypeAndId = (args: Asset) => {
  const assetId = getAssetID(args);
  const assetType = getAssetType(args);
  return { assetId, assetType };
};
