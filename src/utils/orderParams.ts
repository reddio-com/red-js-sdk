import { OrderParams, SignOrderParams } from '../types';
import { ethers } from 'ethers';
import { AxiosInstance } from 'axios';
import { info, getVaultID, getNonce } from '../api';
import { getAssetTypeAndId } from './asset';
import { signOrder } from './sign';
import { parseParams } from './common';

export async function getOrderParams(
  request: AxiosInstance,
  params: OrderParams
) {
  const {
    orderType,
    price,
    quoteToken,
    amount,
    keypair,
    tokenType,
    tokenId,
    tokenAddress,
  } = params;
  const starkKey = keypair.publicKey;
  const [
    { data },
    { data: nonceData },
    { assetId: assetIdBuy },
    { assetId: assetIdSell },
  ] = await Promise.all([
    info(request),
    getNonce(request, {
      starkKey,
    }),
    getAssetTypeAndId(request, {
      type: 'ETH',
    }),
    getAssetTypeAndId(request, {
      type: tokenType,
      tokenId,
      tokenAddress,
    }),
  ]);
  const { data: vaultIdData } = await getVaultID(request, {
    starkKeys: starkKey,
    assetId: [assetIdBuy, assetIdSell],
  });
  const vault_ids = vaultIdData.data.vault_ids;
  const direction = Number(orderType === 'buy');
  const amountBuy = ethers.utils.parseUnits((price * amount).toString(), 6);
  const formatPrice = ethers.utils.parseUnits(price.toString(), 6);
  let partParams;
  if (!direction) {
    partParams = {
      tokenSell: quoteToken,
      tokenBuy: data.data.base_token,
      amountSell: amount.toString(),
      amountBuy: amountBuy.toString(),
      vaultIdBuy: vault_ids[0],
      vaultIdSell: vault_ids[1],
    };
  } else {
    partParams = {
      tokenSell: data.data.base_token,
      tokenBuy: quoteToken,
      amountSell: amountBuy.toString(),
      amountBuy: amount.toString(),
      vaultIdBuy: vault_ids[1],
      vaultIdSell: vault_ids[0],
    };
  }
  const signOrderParams: SignOrderParams = {
    ...partParams,
    expirationTimestamp: 4194303,
    nonce: nonceData.data.nonce,
    feeLimit: Number(data.data.fee_rate) * amountBuy.toNumber(),
    feeVaultId: vault_ids[0],
    feeToken: data.data.fee_token,
    privateKey: keypair.privateKey,
  };
  const signature = signOrder(signOrderParams);
  const {
    privateKey,
    feeToken,
    feeVaultId,
    feeLimit,
    ...obj
  } = signOrderParams;
  return parseParams({
    ...obj,
    quoteToken,
    amount,
    accountId: starkKey,
    signature,
    direction,
    price: formatPrice.toString(),
    baseToken: data.data.base_token,
    feeInfo: {
      feeLimit,
      tokenId: feeToken,
      sourceVaultId: feeVaultId,
    },
  });
}
