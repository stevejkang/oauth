import { IHttpGoogleApiTokenIssuanceResponse } from '../infrastructure/http/dto/IHttpGoogleApiResponse';
import { IHttpGoogleApiTokenIssuanceErrorResponse } from '../infrastructure/http/dto/IHttpGoogleApiErrorResponse';
import { GoogleOAuthTokenOrError } from './GoogleOAuthTokenOrError';
import { GoogleOAuthToken } from './GoogleOAuthToken';

describe('GoogleOAuthTokenOrError', () => {
  let successResponse: IHttpGoogleApiTokenIssuanceResponse;
  let errorResponse: IHttpGoogleApiTokenIssuanceErrorResponse;

  beforeAll(() => {
    successResponse = {
      access_token: 'access_token',
      token_type: 'token_type',
      expires_in: 1000,
      id_token: 'id_token',
      scope: 'scope',
    };

    errorResponse = {
      error: 'error',
      error_description: 'error_description',
    };
  });

  it('should be throw error when googleOAuthToken is not instance of GoogleOAuthToken', () => {
    const googleOAuthToken = null;

    expect(() => new GoogleOAuthTokenOrError(googleOAuthToken, null)).toThrowError();
  });

  it('should be throw error when error is not instance of IHttpGoogleApiTokenIssuanceErrorResponse', () => {
    const error = {
      wrong: 'wrong',
    } as unknown as IHttpGoogleApiTokenIssuanceErrorResponse;

    expect(() => new GoogleOAuthTokenOrError(null, error)).toThrowError();
  });

  it('should be initialized with success response', () => {
    const googleOAuthToken = GoogleOAuthToken.createNew({
      accessToken: successResponse.access_token ?? '',
      tokenType: successResponse.token_type ?? '',
      expiresIn: Number(successResponse.expires_in ?? 0),
      idToken: successResponse.id_token ?? '',
      scope: successResponse.scope ?? '',
    }).value;

    const googleOAuthTokenOrError = new GoogleOAuthTokenOrError(googleOAuthToken, null);

    expect(googleOAuthTokenOrError).toBeDefined();
    expect(googleOAuthTokenOrError.isError()).toBeFalsy();
    expect(googleOAuthTokenOrError.googleOAuthToken).toBe(googleOAuthToken);
    expect(() => googleOAuthTokenOrError.error).toThrowError()
  })

  it('should be initialized with error response', () => {
    const googleOAuthToken = null;

    const googleOAuthTokenOrError = new GoogleOAuthTokenOrError(googleOAuthToken, errorResponse);

    expect(googleOAuthTokenOrError).toBeDefined();
    expect(googleOAuthTokenOrError.isError()).toBeTruthy();
    expect(() => googleOAuthTokenOrError.googleOAuthToken).toThrowError();
    expect(googleOAuthTokenOrError.error).toBe(errorResponse);
  });
});
