import * as qs from 'qs';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { GoogleApiRepository } from '../GoogleApiRepository';
import { GoogleConstants } from '../../domain/constants/GoogleConstants';
import { GoogleOAuthTokenOrError } from '../../domain/GoogleOAuthTokenOrError';
import { GoogleProfileOrError } from '../../domain/GoogleProfileOrError';
import { IHttpGoogleApiProfileResponse, IHttpGoogleApiTokenIssuanceResponse } from './dto/IHttpGoogleApiResponse';
import { HttpGoogleApiRepositoryOAuthTokenMapper } from './mapper/HttpGoogleApiRepositoryOAuthTokenMapper';
import { HttpGoogleApiRepositoryProfileMapper } from './mapper/HttpGoogleApiRepositoryProfileMapper';

export class HttpGoogleApiRepository implements GoogleApiRepository {
  async getAccessToken(code: string): Promise<GoogleOAuthTokenOrError> {
    try {
      const url = new URL(GoogleConstants.OAUTH2_TOKEN_ISSUANCE_URL);
      const body = {
        grant_type: 'authorization_code',
        client_id: GoogleConstants.OAUTH2_CLIENT_ID,
        client_secret: GoogleConstants.OAUTH2_CLIENT_SECRET,
        redirect_uri: GoogleConstants.OAUTH2_REDIRECT_URI,
        code,
      };

      const response: AxiosResponse<IHttpGoogleApiTokenIssuanceResponse> = await axios.post(url.href, qs.stringify(body));

      if (response.data.error) {
        return new GoogleOAuthTokenOrError(null, response.data);
      }

      const googleOAuthToken = HttpGoogleApiRepositoryOAuthTokenMapper.toDomain(response.data);

      return new GoogleOAuthTokenOrError(googleOAuthToken, null);
    } catch (error) {
      if (error && error instanceof AxiosError) {
        const { response } = error;
        if (response) {
          return new GoogleOAuthTokenOrError(null, response.data);
        }

        throw error;
      }

      throw error;
    }
  }

  async getProfile(accessToken: string): Promise<GoogleProfileOrError> {
    try {
      const url = new URL(GoogleConstants.OAUTH2_PROFILE_URL);

      const response: AxiosResponse<IHttpGoogleApiProfileResponse> = await axios.get(url.href, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.data.error) {
        return new GoogleProfileOrError(null, response.data);
      }

      const googleProfile = HttpGoogleApiRepositoryProfileMapper.toDomain(response.data);

      return new GoogleProfileOrError(googleProfile, null);
    } catch (error) {
      if (error && error instanceof AxiosError) {
        const { response } = error;
        if (response) {
          return new GoogleProfileOrError(null, response.data);
        }

        throw error;
      }

      throw error;
    }
  }
}
