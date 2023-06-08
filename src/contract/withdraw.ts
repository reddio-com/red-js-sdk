import assert from 'assert';
import { ethers } from 'ethers';
import { prepareWriteContract, writeContract } from '@wagmi/core';
import type { WriteContractResult } from '@wagmi/core';
import { WithdrawalFromL1Params } from '../types';
import abi from '../abi/Withdraw.abi.json';
import { getERC721MBlob, Types } from '../utils';

export const withdrawalFromL1 = async (
  contractAddress: string,
  params: WithdrawalFromL1Params,
): Promise<WriteContractResult> => {
  const {
    ethAddress, type, assetType, tokenId, tokenUrl,
  } = params;
  switch (type) {
    case Types.ETH:
    case Types.ERC20: {
      const config = await prepareWriteContract({
        address: contractAddress as `0x${string}`,
        abi,
        functionName: 'withdraw',
        args: [ethAddress, assetType],
      });
      return writeContract(config);
    }
    case Types.ERC721: {
      assert(tokenId, 'tokenId is required');
      const config = await prepareWriteContract({
        address: contractAddress as `0x${string}`,
        abi,
        functionName: 'withdrawNft',
        args: [ethAddress,
          assetType,
          ethers.BigNumber.from(tokenId)],
      });
      return writeContract(config);
    }
    default: {
      assert(tokenId, 'tokenId is required');
      if (type === Types.ERC721MC) {
        assert(tokenUrl, 'tokenUrl is required');
      }
      const blob = type === Types.ERC721M ? ethers.utils.arrayify(ethers.utils.hexlify(Number(tokenId))) : getERC721MBlob(tokenUrl, tokenId.toString());
      const config = await prepareWriteContract({
        address: contractAddress as `0x${string}`,
        abi,
        functionName: 'withdrawAndMint',
        args: [ethAddress,
          assetType,
          blob],
      });
      return writeContract(config);
    }
  }
};
