import { BigNumber, ethers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import { AxiosInstance } from 'axios';
import { Deposit721Params, DepositParams, LogDeposit, DepositERC20Params } from '../types';
import abi from '../abi/Deposits.json';
import { getAssetTypeAndId } from '../utils';
import { getVaultID } from './vault';

export const depositERC20 = (
  request: AxiosInstance,
  provider: JsonRpcProvider,
  contractAddress: string,
  params: DepositERC20Params
): Promise<LogDeposit> => {
  return new Promise(async (resolve, reject) => {
    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const { starkKey, quantizedAmount, tokenAddress } = params;
      const { assetId, assetType } = await getAssetTypeAndId(request, {
        type: 'ERC20',
        tokenAddress,
      });
      const { data } = await getVaultID(request, {
        starkKeys: starkKey,
        assetId,
      });
      await contract.depositERC20(
        starkKey,
        assetType,
        data.data.vault_ids[0],
        ethers.utils.parseUnits(quantizedAmount.toString(), 6)
      );

      contract.on(
        'LogDeposit',
        (
          depositorEthKey: string,
          starkKey: BigNumber,
          vaultId: BigNumber,
          assetType: BigNumber,
          nonQuantizedAmount: BigNumber,
          quantizedAmount: BigNumber,
          raw: Record<string, any>
        ) => {
          resolve({
            depositorEthKey,
            starkKey,
            vaultId,
            assetType,
            nonQuantizedAmount,
            quantizedAmount,
            raw,
          });
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

export const depositETH = (
  request: AxiosInstance,
  provider: JsonRpcProvider,
  contractAddress: string,
  params: DepositParams
): Promise<LogDeposit> => {
  return new Promise(async (resolve, reject) => {
    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const { starkKey, quantizedAmount } = params;
      const { assetType, assetId } = await getAssetTypeAndId(request, {
        type: 'ETH',
      });
      const { data } = await getVaultID(request, {
        starkKeys: starkKey,
        assetId,
      });
      await contract.depositEth(starkKey, assetType, data.data.vault_ids[0], {
        value: ethers.utils.parseEther(quantizedAmount.toString()),
      });

      contract.on(
        'LogDeposit',
        (
          depositorEthKey: string,
          starkKey: BigNumber,
          vaultId: BigNumber,
          assetType: BigNumber,
          nonQuantizedAmount: BigNumber,
          quantizedAmount: BigNumber,
          raw: Record<string, any>
        ) => {
          resolve({
            depositorEthKey,
            starkKey,
            vaultId,
            assetType,
            nonQuantizedAmount,
            quantizedAmount,
            raw,
          });
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

export const depositERC721 = (
  provider: JsonRpcProvider,
  contractAddress: string,
  params: Deposit721Params
): Promise<LogDeposit> => {
  return new Promise(async (resolve, reject) => {
    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const { starkKey, vaultId, tokenId, assetType } = params;
      await contract.depositNft(starkKey, assetType, vaultId, tokenId);

      contract.on(
        'LogDeposit',
        (
          depositorEthKey: string,
          starkKey: BigNumber,
          vaultId: BigNumber,
          assetType: BigNumber,
          nonQuantizedAmount: BigNumber,
          quantizedAmount: BigNumber,
          raw: Record<string, any>
        ) => {
          resolve({
            depositorEthKey,
            starkKey,
            vaultId,
            assetType,
            nonQuantizedAmount,
            quantizedAmount,
            raw,
          });
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};
