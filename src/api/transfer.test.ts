import { transfer } from './transfer';

describe('transfer', () => {
  it('should transfer', async function() {
    try {
      const { data } = await transfer({
        tokenId:
          '0x284698644e92ad774d6e601d9f0cefa137872d0eeadc92ea3fe1fb973d32594',
        starkKey:
          '0x761f1709a72a7e1d9a503faf2a1067686f315acdc825a804e1281fbd39accda',
        amount: 100,
        nonce: 100,
        vaultId: 1000,
        receiver:
          '0x761f1709a72a7e1d9a503faf2a1067686f315acdc825a804e1281fbd39accda',
        receiverVaultId: 10,
        expirationTimestamp: 4194303,
        signature: { r: '0xab', s: '0xbb' },
      });
      expect(data.status).toEqual('OK');
      expect(data.data.transaction_id).toBeDefined();
    } catch (e) {
      console.log(e);
    }
  });
});
