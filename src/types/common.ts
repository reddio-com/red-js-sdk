export interface RequestCommonParams {
  address: string;
  starkKey: string;
}

export interface Response<T> {
  data: T;
  status: string;
  error: string;
}

export type SignatureLike = {
  r: string;
  s: string;
};
