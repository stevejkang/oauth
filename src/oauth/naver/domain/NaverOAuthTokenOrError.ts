import { NaverOAuthToken } from './NaverOAuthToken';
import { IHttpNaverApiTokenIssuanceErrorResponse } from '../infrastructure/http/dto/IHttpNaverApiErrorResponse';

export class NaverOAuthTokenOrError {
  private readonly _naverOAuthToken: NaverOAuthToken | null;
  private readonly _error: IHttpNaverApiTokenIssuanceErrorResponse | null;

  constructor(
    naverOAuthToken: NaverOAuthToken | null, error: IHttpNaverApiTokenIssuanceErrorResponse | null,
  ) {
    this._naverOAuthToken = naverOAuthToken;
    this._error = error;

    if (this._error === null && !(this._naverOAuthToken instanceof NaverOAuthToken)) {
      throw new Error('naverOAuthToken must be instance of NaverOAuthToken');
    }

    if (this._error !== null && (!('error' in this._error) || !('error_description' in this._error))) {
      throw new Error('error must be instance of IHttpNaverApiTokenIssuanceErrorResponse');
    }
  }

  public isError(): boolean {
    return this._error !== null;
  }

  get naverOAuthToken(): NaverOAuthToken {
    if (this._naverOAuthToken === null) {
      throw new Error('naverOAuthToken cannot accessible');
    }

    return this._naverOAuthToken;
  }

  get error(): IHttpNaverApiTokenIssuanceErrorResponse {
    if (this._error === null) {
      throw new Error('error cannot accessible');
    }

    return this._error;
  }
}
