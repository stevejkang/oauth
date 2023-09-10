import { IHttpNaverApiTokenIssuanceResponse } from '../infrastructure/http/dto/IHttpNaverApiResponse';
import { IHttpNaverApiTokenIssuanceErrorResponse } from '../infrastructure/http/dto/IHttpNaverApiErrorResponse';
import { NaverOAuthTokenOrError } from './NaverOAuthTokenOrError';
import { NaverOAuthToken } from './NaverOAuthToken';

describe('NaverOAuthTokenOrError', () => {
  let successResponse: IHttpNaverApiTokenIssuanceResponse;
  let errorResponse: IHttpNaverApiTokenIssuanceErrorResponse;

  beforeAll(() => {
    successResponse = {
      access_token: 'access_token',
      refresh_token: 'refresh_token',
      token_type: 'token_type',
      expires_in: 'expires_in',
    };

    errorResponse = {
      error: 'error',
      error_description: 'error_description',
    };
  });

  it('should be throw error when naverOAuthToken is not instance of NaverOAuthToken', () => {
    const naverOAuthToken = null;

    expect(() => new NaverOAuthTokenOrError(naverOAuthToken, null)).toThrowError();
  });

  it('should be throw error when error is not instance of IHttpNaverApiTokenIssuanceErrorResponse', () => {
    const error = {
      wrong: 'wrong',
    } as unknown as IHttpNaverApiTokenIssuanceErrorResponse;

    expect(() => new NaverOAuthTokenOrError(null, error)).toThrowError();
  });

  it('should be initialized with success response', () => {
    const naverOAuthToken = NaverOAuthToken.createNew({
      accessToken: successResponse.access_token ?? '',
      refreshToken: successResponse.refresh_token ?? '',
      expiresIn: Number(successResponse.expires_in ?? 0),
      tokenType: successResponse.token_type ?? '',
    }).value;

    const naverOAuthTokenOrError = new NaverOAuthTokenOrError(naverOAuthToken, null);

    expect(naverOAuthTokenOrError).toBeDefined();
    expect(naverOAuthTokenOrError.isError()).toBeFalsy();
    expect(naverOAuthTokenOrError.naverOAuthToken).toBe(naverOAuthToken);
    expect(() => naverOAuthTokenOrError.error).toThrowError();
  });

  it('should be initialized with error response', () => {
    const naverOAuthToken = null;

    const naverOAuthTokenOrError = new NaverOAuthTokenOrError(naverOAuthToken, errorResponse);

    expect(naverOAuthTokenOrError).toBeDefined();
    expect(naverOAuthTokenOrError.isError()).toBeTruthy();
    expect(naverOAuthTokenOrError.error).toBe(errorResponse);
    expect(() => naverOAuthTokenOrError.naverOAuthToken).toThrowError();
  });
});
