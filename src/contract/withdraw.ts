import { JsonRpcProvider } from '@ethersproject/providers';
import assert from 'assert';
import { WithdrawalFromL1Params } from '../types';
import { ethers } from 'ethers';
import abi from '../abi/Withdraw.abi.json';
import { Types } from '../utils';
import { TransactionResponse } from '@ethersproject/abstract-provider';

export const withdrawalFromL1 = async (
  provider: JsonRpcProvider,
  contractAddress: string,
  params: WithdrawalFromL1Params
): Promise<TransactionResponse> => {
  const signer = provider.getSigner();
  const { starkKey, type, assetType, tokenId } = params;
  const contract = new ethers.Contract(contractAddress, abi, signer);
  switch (type) {
    case Types.ETH:
    case Types.ERC20: {
      return contract.withdraw(starkKey, assetType);
    }
    case Types.ERC721: {
      assert(tokenId, 'tokenId is required');
      return contract.withdrawNft(starkKey, assetType, tokenId);
    }
    default: {
      assert(tokenId, 'tokenId is required');
      return contract.withdrawAndMint(
        starkKey,
        assetType,
        ethers.utils.formatBytes32String(tokenId.toString())
      );
    }
  }
};
