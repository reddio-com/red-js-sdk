import axios from 'axios';
import { getAssetTypeAndId } from './asset';

describe('orderParams', () => {
  it('should output', async () => {
    const request = axios.create({
      baseURL: 'https://api-dev.reddio.com',
    });
    const params = await getAssetTypeAndId(request, {
      type: 'ERC721MC',
      tokenId: '1100',
      tokenAddress: '0xb95623b1d26a6e892c5B4e7B15B83D134156f3AA',
      tokenUrl: 'https://api-dev.reddio.com/v3/balances?stark_key=0x179be264ab70bdc0949bbf3ae2ae3dcefd74562f24bd33459754df1c321f93',
    });
    console.log(params, 111111);
  });
});
