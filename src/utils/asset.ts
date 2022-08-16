// @ts-ignore
import { asset } from '@starkware-industries/starkware-crypto-utils';
import { Asset } from '../types';
import { getContractInfo } from '../api/contractInfo';
import { AxiosInstance } from 'axios';
import assert from 'assert';
import { hexToBuffer } from 'enc-utils';
import { ethers } from 'ethers';

const setQuantum = async (request: AxiosInstance, data: Asset) => {
  if (!data.quantum) {
    if (data.type !== 'ETH') {
      assert(data.tokenAddress, 'tokenAddress is required');
    }
    const { data: res } = await getContractInfo(request, {
      type: data.type,
      contractAddress: data.type === 'ETH' ? 'ETH' : data.tokenAddress!,
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
  if (args.type === 'ERC721M') {
    assert(args.tokenId, 'tokenId is required');
    (args as any).type = 'MINTABLE_ERC721';
    (args as any).blob = hexToBuffer(
      ethers.utils.hexlify(Number(args.tokenId))
    );
  }
  await setQuantum(request, args);
  const { type, ...data } = args;
  (args as any).data = data;
  const assetId: string = await getAssetID(args);
  const assetType: string = await getAssetType(args);
  return { assetId, assetType };
};
