import { BigNumber, ethers } from 'ethers';
import BN from 'bn.js';
import { Types } from './enum';

export const getAssetInfo = (type: Types, address: string) => {
  const value = address.substring(2).padStart(64, '0');
  switch (type) {
    case Types.ETH: {
      return '0x8322fff2';
    }
    case Types.ERC20: {
      return '0xf47261b0' + value;
    }
    case Types.ERC721: {
      return '0x02571792' + value;
    }
    case Types.ERC721M: {
      return '0xb8b86672' + value;
    }
    default: {
      return null;
    }
  }
};

export const getAssetType = (type: Types, address: string, quantum: number) => {
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
  type: Types,
  address: string,
  quantum: number,
  tokenId: number
) => {
  let assetId = getAssetType(type, address, quantum);
  if (type === Types.ERC721) {
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
  if (type === Types.ERC721M) {
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
