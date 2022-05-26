import { getAssetInfo } from './asset';
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
