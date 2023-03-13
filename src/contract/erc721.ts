import { prepareWriteContract, writeContract } from '@wagmi/core';
import type { WriteContractResult } from '@wagmi/core';
import { ApproveErc721Params } from '../types';
import abi from '../abi/Erc721.abi.json';

export const erc721Approve = async (
  contractAddress: string,
  params: ApproveErc721Params,
): Promise<WriteContractResult> => {
  const { tokenAddress, tokenId } = params;
  const config = await prepareWriteContract({
    address: tokenAddress as `0x${string}`,
    abi,
    functionName: 'approve',
    args: [contractAddress, tokenId],
  });
  return writeContract(config);
};
