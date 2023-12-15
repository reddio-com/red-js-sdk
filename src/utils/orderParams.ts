import { ethers } from 'ethers';
import { AxiosInstance } from 'axios';
import assert from 'assert';
import { OrderParams, OrderRequestParams, SignOrderParams } from '../types';
import { info } from '../api';
import { signOrder } from './sign';
import { parseParams } from './common';

export async function getOrderParams(
  request: AxiosInstance,
  params: OrderParams
): Promise<OrderRequestParams> {
  if (params.tokenType === 'ERC20') {
    return getERC20OrderParams(request, params);
  }
  return getNFTOrderParams(request, params);
}

const getERC20OrderParams = async (
  request: AxiosInstance,
  params: OrderParams
) => {
  const {
    orderType,
    price,
    amount,
    keypair,
    tokenType,
    tokenId = '',
    tokenAddress,
    marketplaceUuid,
    baseTokenAddress,
    baseTokenType,
  } = params;
  const starkKey = keypair.publicKey;
  let contract1 = 'ETH:ETH';
  if (baseTokenAddress) {
    assert(baseTokenType, 'baseTokenType is required');
  }
  if (baseTokenType) {
    assert(baseTokenAddress, 'baseTokenAddress is required');
  }
  if (baseTokenType && baseTokenAddress) {
    contract1 = `${baseTokenType}:${baseTokenAddress}`;
  }
  const contract2 = tokenId
    ? `${tokenType}:${tokenAddress}:${tokenId}`
    : `${tokenType}:${tokenAddress}`;
  const { data } = await info(request, {
    starkKey,
    contract1,
    contract2,
  });
  const { vault_ids } = data.data;
  const quoteToken = data.data.asset_ids[1];
  const direction = Number(orderType === 'buy');

  let partParams;
  if (!direction) {
    const amountBuy = ethers.utils
      .parseUnits((Number(price) * Number(amount)).toString(), 6)
      .toString();
    const amountSell = ethers.utils.parseUnits(amount, 6).toString();
    partParams = {
      tokenSell: quoteToken,
      tokenBuy: data.data.base_token,
      amountSell,
      amountBuy: amountBuy,
      vaultIdBuy: vault_ids[0],
      vaultIdSell: vault_ids[1],
    };
  } else {
    const amountBuy = ethers.utils.parseUnits(amount, 6).toString();
    const amountSell = ethers.utils
      .parseUnits((Number(price) * Number(amount)).toString(), 6)
      .toString();
    partParams = {
      tokenSell: data.data.base_token,
      tokenBuy: quoteToken,
      amountSell,
      amountBuy,
      vaultIdBuy: vault_ids[1],
      vaultIdSell: vault_ids[0],
    };
  }
  const feeLimitValue = direction
    ? Number(partParams.amountSell)
    : Number(partParams.amountBuy);
  const signOrderParams: SignOrderParams = {
    ...partParams,
    expirationTimestamp: 4194303,
    nonce: data.data.nonce,
    feeLimit: Number(data.data.fee_rate) * feeLimitValue,
    feeVaultId: Number(vault_ids[0]),
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
    amount: tokenId ? amount : ethers.utils.parseUnits(amount, 6).toString(),
    starkKey,
    signature,
    direction,
    price,
    baseToken: data.data.base_token,
    feeInfo: {
      feeLimit,
      tokenId: feeToken,
      sourceVaultId: feeVaultId,
    },
    marketplaceUuid,
  }) as OrderRequestParams;
};

const getNFTOrderParams = async (
  request: AxiosInstance,
  params: OrderParams
) => {
  const {
    orderType,
    price,
    amount,
    keypair,
    tokenType,
    tokenId,
    tokenAddress,
    marketplaceUuid,
    baseTokenAddress,
    baseTokenType,
  } = params;
  const starkKey = keypair.publicKey;
  let contract1 = 'ETH:ETH';
  if (baseTokenAddress) {
    assert(baseTokenType, 'baseTokenType is required');
  }
  if (baseTokenType) {
    assert(baseTokenAddress, 'baseTokenAddress is required');
  }
  if (baseTokenType && baseTokenAddress) {
    contract1 = `${baseTokenType}:${baseTokenAddress}`;
  }
  const { data } = await info(request, {
    starkKey,
    contract1,
    contract2: `${tokenType}:${tokenAddress}:${tokenId}`,
  });
  const { vault_ids } = data.data;
  const quoteToken = data.data.asset_ids[1];
  const direction = Number(orderType === 'buy');
  const amountBuy = ethers.utils.parseUnits(
    (Number(price) * Number(amount)).toString(),
    6
  );
  const formatPrice = ethers.utils.parseUnits(price, 6);
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
    nonce: data.data.nonce,
    feeLimit: Number(data.data.fee_rate) * amountBuy.toNumber(),
    feeVaultId: Number(vault_ids[0]),
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
    starkKey,
    signature,
    direction,
    price: formatPrice.toString(),
    baseToken: data.data.base_token,
    feeInfo: {
      feeLimit,
      tokenId: feeToken,
      sourceVaultId: feeVaultId,
    },
    marketplaceUuid,
  }) as OrderRequestParams;
};
