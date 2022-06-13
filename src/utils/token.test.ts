import { getTokenInfo, getTokenType, getAssetID } from './token';
import { Types } from './enum';

describe('getAssetInfo', () => {
  it('should get current info', function() {
    const tokenAddress = '0x20a36B174dfb726A33a8416eD2E4894719236140';
    expect(getTokenInfo(Types.ETH, tokenAddress)).toEqual('0x8322fff2');
    expect(getTokenInfo(Types.ERC20, tokenAddress)).toEqual(
      '0xf47261b000000000000000000000000020a36B174dfb726A33a8416eD2E4894719236140'
    );
    expect(getTokenInfo(Types.ERC721, tokenAddress)).toEqual(
      '0x0257179200000000000000000000000020a36B174dfb726A33a8416eD2E4894719236140'
    );
    expect(getTokenInfo(Types.ERC721M, tokenAddress)).toEqual(
      '0xb8b8667200000000000000000000000020a36B174dfb726A33a8416eD2E4894719236140'
    );
    expect(getTokenInfo('' as Types, tokenAddress)).toEqual(null);
  });
});

describe('getAssetType', () => {
  it('should get current type', function() {
    const tokenAddress = '0x20a36B174dfb726A33a8416eD2E4894719236140';
    const quantum = 1;
    expect(getTokenType(Types.ETH, tokenAddress, quantum)).toEqual(
      '0x32e4fb4bbff54367e9a3f929c3ac66533f81dc9bb70d2dc358528db962aa7fb'
    );
    expect(getTokenType(Types.ERC20, tokenAddress, quantum)).toEqual(
      '0x319af4c45f3ae095fffb5b6fd3fba7f7904e317d5e20c5640a051f6629703f7'
    );
    expect(getTokenType(Types.ERC721, tokenAddress, quantum)).toEqual(
      '0x3dff5712501e64edea722c4b7f60c53b7e02d479f7f3209c453e46a5db8a956'
    );
    expect(getTokenType(Types.ERC721M, tokenAddress, quantum)).toEqual(
      '0x3d5c37a13a77b5b73e13aef0ab9cb9edb736215ec1a84dc1f1a011490cd4285'
    );
  });
});

describe('getAssetID', () => {
  it('should get current id', function() {
    const tokenAddress = '0x20a36B174dfb726A33a8416eD2E4894719236140';
    const quantum = 1;
    const tokenID = 1;
    expect(getAssetID(Types.ETH, tokenAddress, quantum, tokenID)).toEqual(
      '0x32e4fb4bbff54367e9a3f929c3ac66533f81dc9bb70d2dc358528db962aa7fb'
    );
    expect(getAssetID(Types.ERC20, tokenAddress, quantum, tokenID)).toEqual(
      '0x319af4c45f3ae095fffb5b6fd3fba7f7904e317d5e20c5640a051f6629703f7'
    );
    expect(getAssetID(Types.ERC721, tokenAddress, quantum, tokenID)).toEqual(
      '0x12ff625d7ac239bc60583147dde4e292442bfacd5bc89505ec62c16598ab1b4'
    );
    expect(getAssetID(Types.ERC721M, tokenAddress, quantum, tokenID)).toEqual(
      '0x40002eed4acd33d69352784f2186354746fcf8b0d9aabbc4116d66cf32fa7fe'
    );
  });
});
