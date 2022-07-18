import { JsonRpcProvider } from '@ethersproject/providers';
import assert from 'assert';
import { WithdrawalFromL1Params } from '../types';
import { ethers } from 'ethers';
import abi from '../abi/Withdraw.abi.json';
import { Types } from '../utils';

export const withdrawalFromL1 = async (
  provider: JsonRpcProvider,
  contractAddress: string,
  params: WithdrawalFromL1Params
) => {
  const signer = provider.getSigner();
  const { starkKey, type, assetType, tokenId } = params;
  const contract = new ethers.Contract(contractAddress, abi, signer);
  if (type === Types.ETH || type === Types.ERC20) {
    return contract.withdraw(starkKey, assetType);
  }
  if (type === Types.ERC721) {
    return contract.withdrawNft(starkKey, assetType);
  }
  if (type === Types.MINTABLE_ERC721) {
    assert(tokenId, 'tokenId is required');
    return contract.withdrawAndMint(
      starkKey,
      assetType,
      ethers.utils.formatBytes32String(tokenId.toString())
    );
  }
};
