import { AxiosInstance } from 'axios';
import {
  Response,
  CollectionResponse,
  CollectionParams,
  CollectionsResponse,
} from '../types';
import { parseParams } from '../utils/common';

export async function getCollection(
  request: AxiosInstance,
  params: CollectionParams
) {
  return request.get<Response<CollectionResponse>>('/v1/collection', {
    params: {
      ...parseParams(params),
    },
  });
}

export async function getCollections(request: AxiosInstance) {
  return request.get<Response<CollectionsResponse[]>>('/v1/collection');
}
