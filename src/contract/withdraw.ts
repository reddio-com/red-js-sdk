import assert from 'assert';
import { ethers } from 'ethers';
import { prepareWriteContract, writeContract } from '@wagmi/core';
import type { WriteContractResult } from '@wagmi/core';
import { WithdrawalFromL1Params } from '../types';
import abi from '../abi/Withdraw.abi.json';
import { Types } from '../utils';

export const withdrawalFromL1 = async (
  contractAddress: string,
  params: WithdrawalFromL1Params,
): Promise<WriteContractResult> => {
  const {
    ethAddress, type, assetType, tokenId,
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
      const config = await prepareWriteContract({
        address: contractAddress as `0x${string}`,
        abi,
        functionName: 'withdrawAndMint',
        args: [ethAddress,
          assetType,
          ethers.utils.arrayify(ethers.utils.hexlify(Number(tokenId)))],
      });
      return writeContract(config);
    }
  }
};
