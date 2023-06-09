import axios from 'axios';
import { getAssetTypeAndId } from './asset';

describe('orderParams', () => {
  it('should output', async () => {
    const request = axios.create({
      baseURL: 'https://api-dev.reddio.com',
    });
    const params = await getAssetTypeAndId(request, {
      type: 'ERC721',
      tokenId: '2',
      tokenAddress: '0x941661bd1134dc7cc3d107bf006b8631f6e65ad5',
      // tokenUrl:
      //   'https://api-dev.reddio.com/v3/balances?stark_key=0x179be264ab70bdc0949bbf3ae2ae3dcefd74562f24bd33459754df1c321f93',
    });
    console.log(params);
  });
});
