import { asset } from '@starkware-industries/starkware-crypto-utils';
import { AxiosInstance } from 'axios';
import assert from 'assert';
import { hexToBuffer } from 'enc-utils';
import { ethers } from 'ethers';
import { getContractInfo } from '../api/contractInfo';
import { Asset } from '../types';

const setQuantum = async (request: AxiosInstance, data: Asset) => {
  if (!data.quantum) {
    if (data.type !== 'ETH') {
      assert(data.tokenAddress, 'tokenAddress is required');
    }
    const { data: res } = await getContractInfo(request, {
      type: data.type,
      contractAddress: data.type === 'ETH' ? 'ETH' : data.tokenAddress!,
    });
    if (res.status !== 'FAILED') {
      data.quantum = res.data.quantum;
    } else {
      throw new Error(res.error);
    }
  }
};

export const getAssetType = (args: Omit<Asset, 'tokenId' | 'blob'>) => {
  const { type, ...data } = args;
  return asset.getAssetType({ type, data });
};

export const getAssetID = (args: Asset) => {
  const { type, ...data } = args;
  return asset.getAssetId({ type, data });
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const getERC721MBlob = (url = '', tokenId: string) => ethers.utils.defaultAbiCoder.encode(
  ['uint256', 'bytes'],
  [tokenId, ethers.utils.hexlify(ethers.utils.toUtf8Bytes(url))],
);

export const getAssetTypeAndId = async (
  request: AxiosInstance,
  args: Asset,
) => {
  const params: any = args;
  await setQuantum(request, params);
  if (params.type.includes('ERC721M')) {
    assert(params.tokenId, 'tokenId is required');
    if (params.type === 'ERC721MC') {
      assert(params.tokenUrl, 'tokenUrl is required');
    }
    params.type = 'MINTABLE_ERC721';
    params.blob = params.type === 'ERC721M'
      ? hexToBuffer(ethers.utils.hexlify(Number(params.tokenId)))
      : getERC721MBlob(params.tokenUrl, params.tokenId.toString());
  }
  const { type, ...data } = params;
  params.data = data;
  const assetId: string = getAssetID(params);
  const assetType: string = getAssetType(params);
  return { assetId, assetType };
};
