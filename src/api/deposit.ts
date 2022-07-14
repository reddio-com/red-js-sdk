import { ethers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import { DepositParams } from '../types';
import abi from '../abi/Deposits.json';

export const depositERC20 = (
  provider: JsonRpcProvider,
  contractAddress: string,
  params: DepositParams
) => {
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
        ethers.utils.parseUnits(quantizedAmount.toString(), 18)
      );

      contract.on('LogDeposit', (...args) => {
        resolve(args);
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const depositETH = (
  provider: JsonRpcProvider,
  contractAddress: string,
  params: DepositParams
) => {
  return new Promise((resolve, reject) => {
    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const { starkKey, vaultId, assetType, quantizedAmount } = params;
      contract.depositEth(starkKey, assetType, vaultId, {
        value: ethers.utils.parseEther(quantizedAmount.toString()),
      });

      contract.on('LogDeposit', (...args) => {
        resolve(args);
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const depositERC721 = (
  provider: JsonRpcProvider,
  contractAddress: string,
  params: DepositParams
) => {
  return new Promise((resolve, reject) => {
    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const { starkKey, vaultId, quantizedAmount, assetType } = params;
      contract.depositNft(starkKey, assetType, vaultId, quantizedAmount);

      contract.on('LogDeposit', (...args) => {
        resolve(args);
      });
    } catch (e) {
      reject(e);
    }
  });
};
