import { ethers } from 'ethers';
import { AxiosInstance } from 'axios';
import {
  prepareWriteContract,
  writeContract,
} from '@wagmi/core';
import type { WriteContractResult } from '@wagmi/core';
import {
  Deposit721Params,
  DepositParams,
  DepositERC20Params,
} from '../types';
import abi from '../abi/Deposits.json';
import { getAssetTypeAndId } from '../utils/asset';
import { getVaultID } from './vault';

export const depositERC20 = async (
  request: AxiosInstance,
  contractAddress: string,
  params: DepositERC20Params,
): Promise<WriteContractResult> => {
  const { starkKey, quantizedAmount, tokenAddress } = params;
  const { assetId, assetType } = await getAssetTypeAndId(request, {
    type: 'ERC20',
    tokenAddress,
  });
  const { data } = await getVaultID(request, {
    starkKeys: starkKey,
    assetId,
  });

  const config = await prepareWriteContract({
    address: contractAddress as `0x${string}`,
    abi,
    functionName: 'depositERC20',
    args: [
      starkKey,
      assetType,
      data.data.vault_ids[0],
      ethers.utils.parseUnits(quantizedAmount.toString(), 6),
    ],
  });
  return writeContract(config);
};

export const depositETH = async (
  request: AxiosInstance,
  contractAddress: string,
  params: DepositParams,
): Promise<WriteContractResult> => {
  const { starkKey, quantizedAmount } = params;
  const { assetType, assetId } = await getAssetTypeAndId(request, {
    type: 'ETH',
  });
  const { data } = await getVaultID(request, {
    starkKeys: starkKey,
    assetId,
  });

  const config = await prepareWriteContract({
    address: contractAddress as `0x${string}`,
    abi,
    functionName: 'depositEth',
    args: [starkKey, assetType, data.data.vault_ids[0]],
    overrides: {
      value: ethers.utils.parseEther(quantizedAmount.toString()),
    },
  });
  return writeContract(config);
};

export const depositERC721 = async (
  request: AxiosInstance,
  contractAddress: string,
  params: Deposit721Params,
): Promise<WriteContractResult> => {
  const { starkKey, tokenAddress, tokenId } = params;
  const { assetId, assetType } = await getAssetTypeAndId(request, {
    type: 'ERC721',
    tokenAddress,
    tokenId,
  });
  const { data } = await getVaultID(request, {
    starkKeys: starkKey,
    assetId,
  });

  const config = await prepareWriteContract({
    address: contractAddress as `0x${string}`,
    abi,
    functionName: 'depositNft',
    args: [starkKey,
      assetType,
      data.data.vault_ids[0],
      tokenId],
  });
  return writeContract(config);
};
