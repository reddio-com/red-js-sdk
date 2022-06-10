import { ethers } from 'ethers';
import { Reddio } from '@reddio/js-sdk';

let reddio: Reddio;

const initReddio = () => {
  if (typeof window !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    reddio = new Reddio({
      provider,
    });
  }
};

export { initReddio, reddio };
