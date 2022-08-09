import { ethers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import { ApproveErc721Params } from '../types';
import abi from '../abi/Erc721.abi.json';
import { TransactionResponse } from '@ethersproject/abstract-provider';

export const erc721Approve = async (
  provider: JsonRpcProvider,
  contractAddress: string,
  params: ApproveErc721Params
): Promise<TransactionResponse> => {
  const signer = provider.getSigner();
  const { tokenAddress, tokenId } = params;
  const contract = new ethers.Contract(tokenAddress, abi, signer);
  return contract.approve(contractAddress, tokenId);
};
