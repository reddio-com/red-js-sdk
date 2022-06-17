import { JsonRpcProvider } from '@ethersproject/providers';
import { WithdrawFromL1Params } from '../types';
import { ethers } from 'ethers';
import abi from '../abi/Withdraw.abi.json';
import { Types } from '../utils';

export const withdrawFromL1 = async (
  provider: JsonRpcProvider,
  contractAddress: string,
  params: WithdrawFromL1Params
) => {
  const signer = provider.getSigner();
  const { starkKey, type, assetType } = params;
  const contract = new ethers.Contract(contractAddress, abi, signer);
  if (type === Types.ETH || type === Types.ERC20) {
    return contract.withdraw(starkKey, assetType);
  }
  if (type === Types.ERC721) {
    return contract.withdrawNft(starkKey, assetType);
  }
};
