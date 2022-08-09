import { BigNumber, ethers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Deposit721Params, DepositParams, LogDeposit } from '../types';
import abi from '../abi/Deposits.json';

export const depositERC20 = (
  provider: JsonRpcProvider,
  contractAddress: string,
  params: DepositParams
): Promise<LogDeposit> => {
  return new Promise((resolve, reject) => {
    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const { starkKey, vaultId, quantizedAmount, assetType } = params;
      // get contract unit
      contract.depositERC20(
        starkKey,
        assetType,
        vaultId,
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
  provider: JsonRpcProvider,
  contractAddress: string,
  params: DepositParams
): Promise<LogDeposit> => {
  return new Promise((resolve, reject) => {
    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const { starkKey, vaultId, assetType, quantizedAmount } = params;
      contract.depositEth(starkKey, assetType, vaultId, {
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
  return new Promise((resolve, reject) => {
    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const { starkKey, vaultId, tokenId, assetType } = params;
      contract.depositNft(starkKey, assetType, vaultId, tokenId);

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
