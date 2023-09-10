import axios, { AxiosError, AxiosResponse } from 'axios';
import { NaverConstants } from '../../domain/constants/NaverConstants';
import { NaverApiRepository } from '../NaverApiRepository';
import { NaverOAuthTokenOrError } from '../../domain/NaverOAuthTokenOrError';
import { NaverProfileOrError } from '../../domain/NaverProfileOrError';
import { IHttpNaverApiProfileResponse, IHttpNaverApiTokenIssuanceResponse } from './dto/IHttpNaverApiResponse';
import { HttpNaverApiRepositoryOAuthTokenMapper } from './mapper/HttpNaverApiRepositoryOAuthTokenMapper';
import { HttpNaverApiRepositoryProfileMapper } from './mapper/HttpNaverApiRepositoryProfileMapper';

export class HttpNaverApiRepository implements NaverApiRepository {
  async getAccessToken(code: string, state: string): Promise<NaverOAuthTokenOrError> {
    try {
      const url = new URL(NaverConstants.OAUTH2_TOKEN_ISSUANCE_URL);
      url.searchParams.append('grant_type', 'authorization_code');
      url.searchParams.append('client_id', NaverConstants.OAUTH2_CLIENT_ID);
      url.searchParams.append('client_secret', NaverConstants.OAUTH2_CLIENT_SECRET);
      url.searchParams.append('code', code);
      url.searchParams.append('state', state); // TODO: Refactor

      const response: AxiosResponse<IHttpNaverApiTokenIssuanceResponse> = await axios.get(url.href);

      if (response.data.error) {
        return new NaverOAuthTokenOrError(null, response.data);
      }

      const naverOAuthToken = HttpNaverApiRepositoryOAuthTokenMapper.toDomain(response.data);

      return new NaverOAuthTokenOrError(naverOAuthToken, null);
    } catch (error) {
      if (error && error instanceof AxiosError) {
        const { response } = error;
        if (response) {
          return new NaverOAuthTokenOrError(null, response.data);
        }

        throw error;
      }

      throw error;
    }
  }

  async getProfile(accessToken: string): Promise<NaverProfileOrError> {
    try {
      const url = new URL(NaverConstants.OAUTH2_PROFILE_URL);
      const response: AxiosResponse<IHttpNaverApiProfileResponse> = await axios.get(url.href, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.data.resultcode !== '00' || !response.data.response) {
        return new NaverProfileOrError(null, response.data);
      }

      const naverProfile = HttpNaverApiRepositoryProfileMapper.toDomain(response.data);
      if (!naverProfile) {
        return new NaverProfileOrError(null, response.data);
      }

      return new NaverProfileOrError(naverProfile, null);
    } catch (error) {
      if (error && error instanceof AxiosError) {
        const { response } = error;
        if (response) {
          return new NaverProfileOrError(null, response.data);
        }

        throw error;
      }

      throw error;
    }
  }
}
