import { withdraw } from './withdraw';

describe('withdraw', () => {
  it('should withdraw', async function() {
    try {
      const { data } = await withdraw({
        address: '0x4240e8b8c0b6e6464a13f555f6395bbfe1c4bdf1',
        starkKey:
          '0x761f1709a72a7e1d9a503faf2a1067686f315acdc825a804e1281fbd39accda',
        amount: 10,
        tokenId: '1',
      });
      expect(data.status).toEqual('OK');
      expect(data.data.transaction_id).toBeDefined();
    } catch (e) {
      console.log(e);
    }
  });
});
