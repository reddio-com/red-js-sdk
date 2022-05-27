import { BigNumber, ethers } from 'ethers';

export const computeNonMintableVaultID = (
  contractAddress: string,
  starkKey: string,
  tokenId: string
) => {
  return BigNumber.from(
    ethers.utils.solidityKeccak256(
      ['address', 'uint256', 'uint256'],
      [contractAddress, starkKey, tokenId]
    )
  );
};
