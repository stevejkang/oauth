import * as qs from 'qs';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { KakaoApiRepository } from '../KakaoApiRepository';
import { KakaoConstants } from '../../domain/constants/KakaoConstants';
import { KakaoOAuthTokenOrError } from '../../domain/KakaoOAuthTokenOrError';
import { KakaoProfileOrError } from '../../domain/KakaoProfileOrError';
import { IHttpKakaoApiProfileResponse, IHttpKakaoApiTokenIssuanceResponse } from './dto/IHttpKakaoApiResponse';
import { HttpKakaoApiRepositoryOAuthTokenMapper } from './mapper/HttpKakaoApiRepositoryOAuthTokenMapper';
import { HttpKakaoApiRepositoryProfileMapper } from './mapper/HttpKakaoApiRepositoryProfileMapper';

export class HttpKakaoApiRepository implements KakaoApiRepository {
  async getAccessToken(code: string): Promise<KakaoOAuthTokenOrError> {
    try {
      const url = new URL(KakaoConstants.OAUTH2_TOKEN_ISSUANCE_URL);
      const body = {
        grant_type: 'authorization_code',
        client_id: KakaoConstants.OAUTH2_CLIENT_ID,
        client_secret: KakaoConstants.OAUTH2_CLIENT_SECRET,
        redirect_url: KakaoConstants.OAUTH2_REDIRECT_URI,
        code,
      };

      const response: AxiosResponse<IHttpKakaoApiTokenIssuanceResponse> = await axios.post(url.href, qs.stringify(body));

      if (response.data.error) {
        return new KakaoOAuthTokenOrError(null, response.data);
      }

      const kakaoOAuthToken = HttpKakaoApiRepositoryOAuthTokenMapper.toDomain(response.data);

      return new KakaoOAuthTokenOrError(kakaoOAuthToken, null);
    } catch (error) {
      if (error && error instanceof AxiosError) {
        const { response } = error;
        if (response) {
          return new KakaoOAuthTokenOrError(null, response.data);
        }

        throw error;
      }

      throw error;
    }
  }

  async getProfile(accessToken: string): Promise<KakaoProfileOrError> {
    try {
      const url = new URL(KakaoConstants.OAUTH2_PROFILE_URL);
      url.searchParams.append('secure_resource', 'true');

      const response: AxiosResponse<IHttpKakaoApiProfileResponse> = await axios.post(url.href, {}, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.data.msg || response.data.code || !response.data.id) {
        return new KakaoProfileOrError(null, response.data);
      }

      const kakaoProfile = HttpKakaoApiRepositoryProfileMapper.toDomain(response.data);
      if (!kakaoProfile) {
        return new KakaoProfileOrError(null, response.data);
      }

      return new KakaoProfileOrError(kakaoProfile, null);
    } catch (error) {
      if (error && error instanceof AxiosError) {
        const { response } = error;
        if (response) {
          return new KakaoProfileOrError(null, response.data);
        }

        throw error;
      }

      throw error;
    }
  }
}
