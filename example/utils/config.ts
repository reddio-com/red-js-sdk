import { ethers } from 'ethers';
import { Reddio } from '@reddio.com/js';

let reddio: Reddio;

const initReddio = () => {
  if (typeof window !== 'undefined' && !reddio) {
    const provider = new ethers.providers.Web3Provider(window.ethereum, {
      name: 'Goerli 测试网络',
      chainId: 5,
    });
    reddio = new Reddio({
      provider,
    });
  }
};

export { initReddio, reddio };
