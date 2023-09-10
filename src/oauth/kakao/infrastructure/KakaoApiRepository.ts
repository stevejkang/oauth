import { KakaoOAuthTokenOrError } from '../domain/KakaoOAuthTokenOrError';
import { KakaoProfileOrError } from '../domain/KakaoProfileOrError';

export const HTTP_KAKAO_API_REPOSITORY = Symbol('HTTP_KAKAO_API_REPOSITORY');

export interface KakaoApiRepository {
  getAccessToken(code: string): Promise<KakaoOAuthTokenOrError>;
  getProfile(accessToken: string): Promise<KakaoProfileOrError>;
}
