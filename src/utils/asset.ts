import { BigNumber, ethers } from 'ethers';
import BN from 'bn.js';
import { Type } from './enum';

export const getAssetInfo = (type: Type, address: string) => {
  const value = address.substring(2).padStart(64, '0');
  switch (type) {
    case Type.ETH: {
      return '0x8322fff2';
    }
    case Type.ERC20: {
      return '0xf47261b0' + value;
    }
    case Type.ERC721: {
      return '0x02571792' + value;
    }
    case Type.ERC721M: {
      return '0xb8b86672' + value;
    }
    default: {
      return null;
    }
  }
};

export const getAssetType = (type: Type, address: string, quantum: number) => {
  const assetInfo = getAssetInfo(type, address);
  const blobHash = new BN(
    BigNumber.from(
      ethers.utils.solidityKeccak256(['bytes', 'uint256'], [assetInfo, quantum])
    ).toString(),
    10
  );
  return (
    '0x' +
    blobHash
      .and(
        new BN(
          '03FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
          16
        )
      )
      .toString('hex')
  );
};

export const getAssetID = (
  type: Type,
  address: string,
  quantum: number,
  tokenId: number
) => {
  let assetId = getAssetType(type, address, quantum);
  if (type === Type.ERC721) {
    const blobHash = new BN(
      BigNumber.from(
        ethers.utils.solidityKeccak256(
          ['string', 'uint256', 'uint256'],
          ['NFT:', assetId, tokenId]
        )
      ).toString(),
      10
    );
    return (
      '0x' +
      blobHash
        .and(
          new BN(
            '03FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
            16
          )
        )
        .toString('hex')
    );
  }
  if (type === Type.ERC721M) {
    let blobHash = new BN(
      BigNumber.from(
        ethers.utils.solidityKeccak256(['string'], ['NFT:'])
      ).toString(),
      10
    );
    blobHash = new BN(
      BigNumber.from(
        ethers.utils.solidityKeccak256(
          ['string', 'uint256', 'uint256'],
          ['MINTABLE:', assetId, blobHash.toString()]
        )
      ).toString(),
      10
    );
    return (
      '0x' +
      blobHash
        .and(
          new BN(
            '0000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
            16
          )
        )
        .or(
          new BN(
            '400000000000000000000000000000000000000000000000000000000000000',
            16
          )
        )
        .toString('hex')
    );
  }
  return assetId;
};
