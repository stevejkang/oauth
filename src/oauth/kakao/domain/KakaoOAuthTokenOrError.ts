import { KakaoOAuthToken } from './KakaoOAuthToken';
import { IHttpKakaoApiTokenIssuanceErrorResponse } from '../infrastructure/http/dto/IHttpKakaoApiErrorResponse';

export class KakaoOAuthTokenOrError {
  private readonly _kakaoOAuthToken: KakaoOAuthToken | null;
  private readonly _error: IHttpKakaoApiTokenIssuanceErrorResponse | null;

  constructor(
    kakaoOAuthToken: KakaoOAuthToken | null, error: IHttpKakaoApiTokenIssuanceErrorResponse | null,
  ) {
    this._kakaoOAuthToken = kakaoOAuthToken;
    this._error = error;

    if (this._error === null && !(this._kakaoOAuthToken instanceof KakaoOAuthToken)) {
      throw new Error('kakaoOAuthToken must be instance of KakaoOAuthToken');
    }

    if (this._error !== null && (!('error' in this._error) || !('error_description' in this._error) || !('error_code' in this._error))) {
      throw new Error('error must be instance of IHttpKakaoApiTokenIssuanceErrorResponse');
    }
  }

  public isError(): boolean {
    return this._error !== null;
  }

  get kakaoOAuthToken(): KakaoOAuthToken {
    if (this._kakaoOAuthToken === null) {
      throw new Error('kakaoOAuthToken cannot accessible');
    }

    return this._kakaoOAuthToken;
  }

  get error(): IHttpKakaoApiTokenIssuanceErrorResponse {
    if (this._error === null) {
      throw new Error('error cannot accessible');
    }

    return this._error;
  }
}
