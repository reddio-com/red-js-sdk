import { ethers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import { DepositERC20Params } from '../types';
import abi from '../abi/Deposits.json';

export const depositERC20 = (
  provider: JsonRpcProvider,
  contractAddress: string,
  params: DepositERC20Params
) => {
  return new Promise((resolve, reject) => {
    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const { starkKey, vaultId, quantizedAmount, assetType } = params;
      contract.depositERC20(starkKey, assetType, vaultId, quantizedAmount);

      contract.on('LogDeposit', (...args) => {
        resolve(args);
      });
    } catch (e) {
      reject(e);
    }
  });
};
