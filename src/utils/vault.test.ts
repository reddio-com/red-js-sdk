import { computeNonMintableVaultID } from './vault';

describe('vault', () => {
  it('should get current vault id', function() {
    const contractAddress = '0x0000000000000000000000000000000000000000';
    const starkKey = '0x0000000000000000000000000000000000000000';
    expect(
      computeNonMintableVaultID(contractAddress, starkKey, '0').toString()
    ).toEqual(
      '53916988545564965619822619896099303065558349207878372189632902207599448438713'
    );
    expect(
      computeNonMintableVaultID(contractAddress, starkKey, '1').toString()
    ).toEqual(
      '115147413598759353557856003478446305070620976281594218897127980067593660334602'
    );
    expect(
      computeNonMintableVaultID(contractAddress, starkKey, '2').toString()
    ).toEqual(
      '20926640855977085010158157288760465666819100793539207375209848168612124629679'
    );
    expect(
      computeNonMintableVaultID(contractAddress, starkKey, '3').toString()
    ).toEqual(
      '4098262814009087799195924930943162521831926311420959619776957014098718549357'
    );
  });
});
