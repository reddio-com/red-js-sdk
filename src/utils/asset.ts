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
  const value = new BN(
    BigNumber.from(
      ethers.utils.solidityKeccak256(['bytes', 'uint256'], [assetInfo, quantum])
    ).toString(),
    10
  );
  return (
    '0x' +
    value
      .and(
        new BN(
          '03FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
          16
        )
      )
      .toString('hex')
  );
};
