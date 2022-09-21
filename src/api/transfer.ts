import { AxiosInstance } from 'axios';
import { parseParams, signTransfer, getAssetTypeAndId } from '../utils';
import { getNonce, getVaultID } from './index';
import {
  TransferResponse,
  TransferRequestParams,
  Response,
  SignTransferParams,
  Asset,
} from '../types';
import { ethers } from 'ethers';

export const getTransferParams = async (
  request: AxiosInstance,
  data: any
) => {
  const {
    starkKey,
    receiver,
    type,
    contractAddress,
    tokenId,
    expirationTimestamp = 4194303,
  } = data;
  const assetInfoParams: Asset = {
    type,
  };
  if (type !== 'ETH') {
    assetInfoParams.tokenAddress = contractAddress;
  }
  if (type === 'ERC721' || type === 'ERC721M') {
    assetInfoParams.tokenId = tokenId;
  }
  const { assetId } = await getAssetTypeAndId(request, assetInfoParams);
  const { data: vaultData } = await getVaultID(request, {
    starkKeys: [starkKey, receiver],
    assetId,
  });
  const { data: result } = await getNonce(request, { starkKey });
  const nonce = result.data.nonce;
  if (!data.amount) {
    data.amount = '1';
  } else {
    data.amount = ethers.utils.parseUnits(data.amount.toString(), 6).toString();
  }
  data.vaultId = vaultData.data.vault_ids[0]
  data.receiverVaultId = vaultData.data.vault_ids[1]
  data.assetId = assetId
  const params: TransferRequestParams = {
    ...data,
    expirationTimestamp,
    receiver,
    signature: signTransfer(nonce, data),
    nonce,
  };
  delete params.type;
  delete params.privateKey;
  return params;
};

export const transfer = async (
  request: AxiosInstance,
  data: SignTransferParams
) => {
  const params = await getTransferParams(request, data);
  return request.post<Response<TransferResponse>>('/v1/transfers', {
    ...parseParams(params),
  });
};
