import { IHttpKakaoApiTokenIssuanceResponse } from '../infrastructure/http/dto/IHttpKakaoApiResponse';
import { IHttpKakaoApiTokenIssuanceErrorResponse } from '../infrastructure/http/dto/IHttpKakaoApiErrorResponse';
import { KakaoOAuthTokenOrError } from './KakaoOAuthTokenOrError';
import { KakaoOAuthToken } from './KakaoOAuthToken';

describe('KakaoOAuthTokenOrError', () => {
  let successResponse: IHttpKakaoApiTokenIssuanceResponse;
  let errorResponse: IHttpKakaoApiTokenIssuanceErrorResponse;

  beforeAll(() => {
    successResponse = {
      access_token: 'access_token',
      token_type: 'token_type',
      refresh_token: 'refresh_token',
      expires_in: 1000,
      id_token: 'id_token',
      scope: 'scope',
      refresh_token_expires_in: 1000,
    };

    errorResponse = {
      error: 'error',
      error_description: 'error_description',
      error_code: 'error_code',
    };
  });

  it('should be throw error when kakaoOAuthToken is not instance of KakaoOAuthToken', () => {
    const kakaoOAuthToken = null;

    expect(() => new KakaoOAuthTokenOrError(kakaoOAuthToken, null)).toThrowError();
  });

  it('should be throw error when error is not instance of IHttpKakaoApiTokenIssuanceErrorResponse', () => {
    const error = {
      wrong: 'wrong',
    } as unknown as IHttpKakaoApiTokenIssuanceErrorResponse;

    expect(() => new KakaoOAuthTokenOrError(null, error)).toThrowError();
  });

  it('should be initialized with success response', () => {
    const kakaoOAuthToken = KakaoOAuthToken.createNew({
      accessToken: successResponse.access_token ?? '',
      refreshToken: successResponse.refresh_token ?? '',
      tokenType: successResponse.token_type ?? '',
      expiresIn: Number(successResponse.expires_in ?? 0),
      idToken: successResponse.id_token ?? '',
      scope: successResponse.scope ?? '',
    }).value;

    const kakaoOAuthTokenOrError = new KakaoOAuthTokenOrError(kakaoOAuthToken, null);

    expect(kakaoOAuthTokenOrError).toBeDefined();
    expect(kakaoOAuthTokenOrError.isError()).toBeFalsy();
    expect(kakaoOAuthTokenOrError.kakaoOAuthToken).toBe(kakaoOAuthToken);
    expect(() => kakaoOAuthTokenOrError.error).toThrowError()
  });

  it('should be initialized with error response', () => {
    const kakaoOAuthToken = null;

    const kakaoOAuthTokenOrError = new KakaoOAuthTokenOrError(kakaoOAuthToken, errorResponse);

    expect(kakaoOAuthTokenOrError).toBeDefined();
    expect(kakaoOAuthTokenOrError.isError()).toBeTruthy();
    expect(kakaoOAuthTokenOrError.error).toBe(errorResponse);
    expect(() => kakaoOAuthTokenOrError.kakaoOAuthToken).toThrowError();
  });
});
