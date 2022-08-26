import { ethers } from 'ethers';
import { Reddio } from '@reddio.com/js';
import { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';

let reddio: Reddio;
let provider: Web3Provider;

const initReddio = () => {
  if (typeof window !== 'undefined' && !reddio) {
    provider = new ethers.providers.Web3Provider(window.ethereum, {
      name: 'Goerli 测试网络',
      chainId: 5,
    });
    reddio = new Reddio({
      provider,
      env: 'test',
    });
  }
};

export { initReddio, reddio, provider };
