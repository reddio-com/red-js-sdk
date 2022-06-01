import { getVaultID } from './vault';

describe('vault', () => {
  it('should get current vault id', async function() {
    const params = {
      address: '0x4240e8b8c0b6E6464a13F555F6395BbfE1c4bdf1',
      starkKey:
        '0x761f1709a72a7e1d9a503faf2a1067686f315acdc825a804e1281fbd39accda',
    };

    const { data } = await getVaultID(params);

    expect(data.status).toEqual('OK');
    expect(data.data.vault_id).toBeDefined();
  });
});
