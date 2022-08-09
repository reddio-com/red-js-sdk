import { ethers } from 'ethers';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { JsonRpcProvider } from '@ethersproject/providers';
import { ApproveErc20Params, ErcCommonParams } from '../types';
import abi from '../abi/Erc20.abi.json';

export const erc20Approve = async (
  provider: JsonRpcProvider,
  contractAddress: string,
  params: ApproveErc20Params
): Promise<TransactionResponse> => {
  const signer = provider.getSigner();
  const { tokenAddress, amount } = params;
  const contract = new ethers.Contract(tokenAddress, abi, signer);
  const decimals = await contract.decimals();
  return contract.approve(
    contractAddress,
    ethers.utils.parseUnits(amount.toString(), decimals)
  );
};

export const erc20Allowance = (
  provider: JsonRpcProvider,
  contractAddress: string,
  params: ErcCommonParams
): Promise<TransactionResponse> => {
  const signer = provider.getSigner();
  const account = signer.getAddress();
  const { tokenAddress } = params;
  const contract = new ethers.Contract(tokenAddress, abi, signer);
  return contract.allowance(account, contractAddress);
};
