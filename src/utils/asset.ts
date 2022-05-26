// import { ethers } from 'ethers';
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
