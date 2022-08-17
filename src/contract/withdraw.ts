import { JsonRpcProvider } from '@ethersproject/providers';
import assert from 'assert';
import { WithdrawalFromL1Params } from '../types';
import { ethers } from 'ethers';
import abi from '../abi/Withdraw.abi.json';
import { Types } from '../utils';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { hexToBuffer } from 'enc-utils';

export const withdrawalFromL1 = async (
  provider: JsonRpcProvider,
  contractAddress: string,
  params: WithdrawalFromL1Params
): Promise<TransactionResponse> => {
  const signer = provider.getSigner();
  const { ethAddress, type, assetType, tokenId } = params;
  const contract = new ethers.Contract(contractAddress, abi, signer);
  switch (type) {
    case Types.ETH:
    case Types.ERC20: {
      return contract.withdraw(ethAddress, assetType);
    }
    case Types.ERC721: {
      assert(tokenId, 'tokenId is required');
      return contract.withdrawNft(
        ethAddress,
        assetType,
        ethers.BigNumber.from(tokenId)
      );
    }
    default: {
      assert(tokenId, 'tokenId is required');
      return contract.withdrawAndMint(
        ethAddress,
        assetType,
        hexToBuffer(ethers.utils.hexlify(Number(tokenId)))
      );
    }
  }
};
