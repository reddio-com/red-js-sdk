import { AxiosInstance } from 'axios';
import { ethers } from 'ethers';
import { parseParams } from '../utils/common';
import { getAssetTypeAndId } from '../utils/asset';
import { signTransfer } from '../utils/sign';
import { getNonce } from './nonce';
import { getVaultID } from './vault';
import {
  TransferResponse,
  TransferRequestParams,
  Response,
  SignTransferParams,
  Asset,
} from '../types';

export const getTransferParams = async (request: AxiosInstance, data: any) => {
  const {
    starkKey,
    receiver,
    type,
    contractAddress,
    tokenId,
    expirationTimestamp = 4194303,
    tokenUrl,
  } = data;
  const assetInfoParams: Asset = {
    type,
  };
  if (type !== 'ETH') {
    assetInfoParams.tokenAddress = contractAddress;
  }
  if (type.includes('ERC721')) {
    assetInfoParams.tokenId = tokenId;
  }
  if (type === 'ERC721MC') {
    assetInfoParams.tokenUrl = tokenUrl;
  }
  const { assetId } = await getAssetTypeAndId(request, assetInfoParams);
  const { data: vaultData } = await getVaultID(request, {
    starkKeys: [starkKey, receiver],
    assetId,
  });
  const { data: result } = await getNonce(request, { starkKey });
  const { nonce } = result.data;
  if (!data.amount || type.includes('ERC721')) {
    data.amount = '1';
  } else {
    data.amount = ethers.utils.parseUnits(data.amount.toString(), 6).toString();
  }
  data.vaultId = vaultData.data.vault_ids[0];
  data.receiverVaultId = vaultData.data.vault_ids[1];
  data.assetId = assetId;
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
