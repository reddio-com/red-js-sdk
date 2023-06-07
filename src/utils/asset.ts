import { asset } from '@starkware-industries/starkware-crypto-utils';
import { AxiosInstance } from 'axios';
import { keccak256, sha3_256 } from 'js-sha3';
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

function bigIntToUint8Array(bigint: bigint) {
  let hex = bigint.toString(16);
  if (hex.length % 2) {
    hex = `0${hex}`;
  }

  const len = hex.length / 2;
  const u8 = new Uint8Array(len);

  let i = 0;
  let j = 0;
  while (i < len) {
    u8[i] = parseInt(hex.slice(j, j + 2), 16);
    i += 1;
    j += 2;
  }

  return u8;
}

const getERC721MBlob = (url: string = '', tokenId: string) => {
  const tokenIdBytes = bigIntToUint8Array(BigInt(tokenId));
  const urlHash = sha3_256.array(Buffer.from(url));
  const tokenIdHash = sha3_256.array(tokenIdBytes);

  const combinedHash = new Uint8Array([...urlHash, ...tokenIdHash]);

  let combinedHashStr = combinedHash.reduce(
    (str, byte) => str + byte.toString(16).padStart(2, '0'),
    ''
  );

  if (combinedHashStr.length % 2 !== 0) {
    combinedHashStr = `0${combinedHashStr}`;
  }

  const hash = keccak256.create();

  hash.update(Buffer.from(combinedHashStr, 'hex'));

  const blobHashHex = hash.array();

  return blobHashHex.reduce(
    (str, byte) => str + byte.toString(16).padStart(2, '0'),
    ''
  );
};

export const getAssetTypeAndId = async (
  request: AxiosInstance,
  args: Asset
) => {
  const params: any = args;
  await setQuantum(request, params);
  if (params.type.includes('ERC721M')) {
    assert(params.tokenId, 'tokenId is required');
    if (params.type === 'ERC721MC') {
      assert(params.tokenUrl, 'tokenUrl is required');
    }
    params.type = 'MINTABLE_ERC721';
    params.blob =
      params.type === 'ERC721M'
        ? hexToBuffer(ethers.utils.hexlify(Number(params.tokenId)))
        : getERC721MBlob(params.tokenUrl, params.tokenId.toString());
  }
  const { type, ...data } = params;
  params.data = data;
  const assetId: string = getAssetID(params);
  const assetType: string = getAssetType(params);
  return { assetId, assetType };
};
