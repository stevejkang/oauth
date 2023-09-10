import { GoogleOAuthTokenOrError } from '../domain/GoogleOAuthTokenOrError';
import { GoogleProfileOrError } from '../domain/GoogleProfileOrError';

export const HTTP_GOOGLE_API_REPOSITORY = Symbol('HTTP_GOOGLE_API_REPOSITORY');

export interface GoogleApiRepository {
  getAccessToken(code: string): Promise<GoogleOAuthTokenOrError>;
  getProfile(accessToken: string): Promise<GoogleProfileOrError>;
}
