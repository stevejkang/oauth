import { IHttpKakaoApiProfileErrorResponse, IHttpKakaoApiTokenIssuanceErrorResponse } from './IHttpKakaoApiErrorResponse';

export interface IHttpKakaoApiTokenIssuanceResponse extends IHttpKakaoApiTokenIssuanceErrorResponse {
  access_token?: string;
  token_type?: string;
  refresh_token?: string;
  id_token?: string;
  expires_in?: number;
  scope?: string;
  refresh_token_expires_in?: number;
}

export interface IHttpKakaoApiProfileResponse extends IHttpKakaoApiProfileErrorResponse {
  id?: number;
  kakao_account?: {
    is_email_valid?: boolean;
    is_email_verified?: boolean;
    email?: string;
    profile?: {
      nickname?: string;
      thumbnail_image_url?: string;
      profile_image_url?: string;
    };
    name?: string;
    age_range?: string;
    birthyear?: string;
    birthday?: string;
    gender?: string;
    phone_number?: string;
    ci?: string;
  };
}
