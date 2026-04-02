import { APIResponseStatus, ErrorAPIResponse } from '../index.js';

export type APIResponse<T> = {
  status: APIResponseStatus;
  message: string;
  data?: T;
  error?: ErrorAPIResponse;
};
