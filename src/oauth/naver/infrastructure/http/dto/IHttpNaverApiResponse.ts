import { IHttpNaverApiProfileErrorResponse, IHttpNaverApiTokenIssuanceErrorResponse } from './IHttpNaverApiErrorResponse';

export interface IHttpNaverApiTokenIssuanceResponse extends IHttpNaverApiTokenIssuanceErrorResponse {
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  expires_in?: string;
}

export interface IHttpNaverApiProfileResponse extends IHttpNaverApiProfileErrorResponse {
  resultcode: string;
  message: string;
  response?: {
    id: string;
    email: string;
    nickname?: string;
    name?: string;
    gender?: string;
    age?: string;
    birthday?: string;
    birthyear?: string;
    profile_image?: string;
    mobile?: string;
  };
}
