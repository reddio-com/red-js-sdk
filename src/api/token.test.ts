import { registerToken } from './token';

describe('token', () => {
  it('should registerToken', async function() {
    const { data } = await registerToken({
      address: '0x4240e8b8c0b6e6464a13f555f6395bbfe1c4bdf1',
      type: 'ERC20M',
    });

    expect(data.status).toEqual('OK');
    expect(data.data.tx_hash).toBeDefined();
  });
});
