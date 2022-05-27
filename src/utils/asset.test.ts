import { getAssetInfo, getAssetType } from './asset';
import { Type } from './enum';

describe('getAssetInfo', () => {
  it('should get current info', function() {
    const tokenAddress = '0x20a36B174dfb726A33a8416eD2E4894719236140';
    expect(getAssetInfo(Type.ETH, tokenAddress)).toEqual('0x8322fff2');
    expect(getAssetInfo(Type.ERC20, tokenAddress)).toEqual(
      '0xf47261b000000000000000000000000020a36B174dfb726A33a8416eD2E4894719236140'
    );
    expect(getAssetInfo(Type.ERC721, tokenAddress)).toEqual(
      '0x0257179200000000000000000000000020a36B174dfb726A33a8416eD2E4894719236140'
    );
    expect(getAssetInfo(Type.ERC721M, tokenAddress)).toEqual(
      '0xb8b8667200000000000000000000000020a36B174dfb726A33a8416eD2E4894719236140'
    );
    expect(getAssetInfo('' as Type, tokenAddress)).toEqual(null);
  });
});

describe('getAssetType', () => {
  it('should get current type', function() {
    const tokenAddress = '0x20a36B174dfb726A33a8416eD2E4894719236140';
    const quantum = 1;
    expect(getAssetType(Type.ETH, tokenAddress, quantum)).toEqual(
      '0x1142460171646987f20c714eda4b92812b22b811f56f27130937c267e29bd9e'
    );
    console.log(getAssetType(Type.ETH, tokenAddress, quantum));
    expect(getAssetType(Type.ERC20, tokenAddress, quantum)).toEqual(
      '0x11ab3af6727fcd73565816e286a2ee5008c230ac36a9d7f8de9cc9494bb95d'
    );
    expect(getAssetType(Type.ERC721, tokenAddress, quantum)).toEqual(
      '0x39e2cce8afb88142a6affa0da853055331826b7f8ddc9ef890edc4dd57ee07f'
    );
    expect(getAssetType(Type.ERC721M, tokenAddress, quantum)).toEqual(
      '0xe4e7390a3d8762570fce723533098772f6e0d575a54420e39296a13c525f23'
    );
  });
});
