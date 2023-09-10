import { GoogleOAuthToken } from './GoogleOAuthToken';
import { IHttpGoogleApiTokenIssuanceErrorResponse } from '../infrastructure/http/dto/IHttpGoogleApiErrorResponse';

export class GoogleOAuthTokenOrError {
  private readonly _googleOAuthToken: GoogleOAuthToken | null;
  private readonly _error: IHttpGoogleApiTokenIssuanceErrorResponse | null;

  constructor(
    googleOAuthToken: GoogleOAuthToken | null, error: IHttpGoogleApiTokenIssuanceErrorResponse | null,
  ) {
    this._googleOAuthToken = googleOAuthToken;
    this._error = error;

    if (this._error === null && !(this._googleOAuthToken instanceof GoogleOAuthToken)) {
      throw new Error('googleOAuthToken must be instance of GoogleOAuthToken');
    }

    if (this._error !== null && (!('error' in this._error) || !('error_description' in this._error))) {
      throw new Error('error must be instance of IHttpGoogleApiTokenIssuanceErrorResponse');
    }
  }

  public isError(): boolean {
    return this._error !== null;
  }

  get googleOAuthToken(): GoogleOAuthToken {
    if (this._googleOAuthToken === null) {
      throw new Error('googleOAuthToken cannot accessible');
    }

    return this._googleOAuthToken;
  }

  get error(): IHttpGoogleApiTokenIssuanceErrorResponse {
    if (this._error === null) {
      throw new Error('error cannot accessible');
    }

    return this._error;
  }
}
