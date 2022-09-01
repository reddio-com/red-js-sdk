import { getOrderParams } from './orderParams';
import axios from 'axios';

describe('orderParams', () => {
  it('should output', async function() {
    const request = axios.create({
      baseURL: 'https://api-dev.reddio.com',
    });
    const params = await getOrderParams(request, {
      keypair: {
        privateKey:
          '28608afd7ec65c262f5c45a00ec63b4ee2dd9fa3c7cea5d755696056aed4f02',
        publicKey:
          '0x3d2161b60487fb223760e586efaf70004ddc018b53b8cdb39cb75ef4b4e25f7',
      },
      amount: 1,
      price: 0.001,
      tokenType: 'ERC721M',
      orderType: 'buy',
      tokenId: 5978,
      tokenAddress: '0xed74e5bf4131c5f3b30f68c5d743caa20b9677d7',
    });
    console.log(params);
  });
});
