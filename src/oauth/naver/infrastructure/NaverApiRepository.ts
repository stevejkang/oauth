import { NaverOAuthTokenOrError } from '../domain/NaverOAuthTokenOrError';
import { NaverProfileOrError } from '../domain/NaverProfileOrError';

export const HTTP_NAVER_API_REPOSITORY = Symbol('HTTP_NAVER_API_REPOSITORY');

export interface NaverApiRepository {
  getAccessToken(code: string, state: string): Promise<NaverOAuthTokenOrError>;
  getProfile(accessToken: string): Promise<NaverProfileOrError>;
}
