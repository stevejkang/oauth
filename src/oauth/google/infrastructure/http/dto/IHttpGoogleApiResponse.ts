import { IHttpGoogleApiProfileErrorResponse, IHttpGoogleApiTokenIssuanceErrorResponse } from './IHttpGoogleApiErrorResponse';

export interface IHttpGoogleApiTokenIssuanceResponse extends IHttpGoogleApiTokenIssuanceErrorResponse {
  access_token?: string;
  expires_in?: number;
  scope?: string;
  token_type?: string;
  id_token?: string;
}

export interface IHttpGoogleApiProfileResponse extends IHttpGoogleApiProfileErrorResponse {
  sub?: string;
  picture?: string;
  email?: string;
  email_verified?: boolean;
}
