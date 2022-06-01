import { getNonce } from './nonce';

describe('nonce', () => {
  it('should getNonce', async function() {
    const { data } = await getNonce({
      starkKey:
        '0x761f1709a72a7e1d9a503faf2a1067686f315acdc825a804e1281fbd39accda',
    });
    expect(data.status).toEqual('OK');
    expect(data.data.nonce).toBeDefined();
  });
});
