import { ethers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import { ApproveErc20Params, Erc20CommonParams } from '../types/erc20';
import abi from '../abi/Erc20.abi.json';

export const approve = (
  provider: JsonRpcProvider,
  contractAddress: string,
  params: ApproveErc20Params
) => {
  const signer = provider.getSigner();
  const { tokenAddress, amount } = params;
  const contract = new ethers.Contract(tokenAddress, abi, signer);
  return contract.approve(contractAddress, amount);
};

export const allowance = (
  provider: JsonRpcProvider,
  contractAddress: string,
  params: Erc20CommonParams
) => {
  const signer = provider.getSigner();
  const account = signer.getAddress();
  const { tokenAddress } = params;
  const contract = new ethers.Contract(tokenAddress, abi, signer);
  return contract.allowance(account, contractAddress);
};