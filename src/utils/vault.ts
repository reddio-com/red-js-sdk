import reddio from '../core';

interface VaultParams {
  contractAddress: string;
  starkKey: string;
  tokenId?: string;
}

interface VaultResponse {
  vault_id: number;
}

const getVaultID = async (params: VaultParams) => {
  const { contractAddress, starkKey, tokenId } = params;
  return reddio.request.get<VaultResponse>('/api/v1/vault', {
    params: {
      contract: contractAddress,
      stark_key: starkKey,
      token_id: tokenId,
    },
  });
};

export { getVaultID };
