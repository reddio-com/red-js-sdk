import { mintERC20 } from './mint';

describe('mint', () => {
  it('should registerToken', async function() {
    const { data } = await mintERC20({
      address: '0x4240e8b8c0b6e6464a13f555f6395bbfe1c4bdf1',
      starkKey:
        '0x761f1709a72a7e1d9a503faf2a1067686f315acdc825a804e1281fbd39accda',
      amount: 10,
    });
    expect(data.status).toEqual('OK');
    expect(data.data.txid).toBeDefined();
  });
});
