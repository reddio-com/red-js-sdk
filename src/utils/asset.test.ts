import axios from 'axios';
import { getAssetTypeAndId } from './asset';

describe('orderParams', () => {
  it('should output', async () => {
    const request = axios.create({
      baseURL: 'https://api-dev.reddio.com',
    });
    const params = await getAssetTypeAndId(request, {
      type: 'ERC721MC',
      tokenId: '12',
      tokenAddress: '0x823e0E1E0a3122177DcEaF7162669d93Edea7A42',
      tokenUrl: 'https://www.google.com',
    });
    console.log(params, 111111);
  });
});
