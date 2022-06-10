import { ethers } from 'ethers';
import { Reddio } from '@reddio/js-sdk';

let reddio: Reddio;

const initReddio = () => {
  console.log(111);
  if (typeof window !== 'undefined') {
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    reddio = new Reddio({
      provider,
    });
    console.log(reddio);
  }
};

export { initReddio, reddio };
