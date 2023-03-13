import { BigNumber, ethers } from 'ethers';
import { prepareWriteContract, writeContract, readContract } from '@wagmi/core';
import type { WriteContractResult } from '@wagmi/core';
import { ApproveErc20Params } from '../types';
import abi from '../abi/Erc20.abi.json';

export const erc20Approve = async (
  contractAddress: string,
  params: ApproveErc20Params,
): Promise<WriteContractResult> => {
  const { tokenAddress, amount } = params;
  const decimals = await readContract({
    address: tokenAddress as `0x${string}`,
    abi,
    functionName: 'decimals',
  }) as BigNumber | undefined;
  const config = await prepareWriteContract({
    address: tokenAddress as `0x${string}`,
    abi,
    functionName: 'approve',
    args: [contractAddress, ethers.utils.parseUnits(amount.toString(), decimals)],
  });
  return writeContract(config);
};
