import { IHttpGoogleApiProfileErrorResponse } from '../infrastructure/http/dto/IHttpGoogleApiErrorResponse';
import { GoogleProfile } from './GoogleProfile';

export class GoogleProfileOrError {
  private readonly _googleProfile: GoogleProfile | null;
  private readonly _error: IHttpGoogleApiProfileErrorResponse | null;

  constructor(
    googleProfile: GoogleProfile | null, error: IHttpGoogleApiProfileErrorResponse | null,
  ) {
    this._googleProfile = googleProfile;
    this._error = error;

    if (this._error === null && !(this._googleProfile instanceof GoogleProfile)) {
      throw new Error('googleProfile must be instance of GoogleProfile');
    }

    if (this._error !== null && (!('error' in this._error) || !('error_description' in this._error))) {
      throw new Error('error must be instance of IHttpGoogleApiProfileErrorResponse');
    }
  }
  
  public isError(): boolean {
    return this._error !== null;
  }
  
  get googleProfile(): GoogleProfile {
    if (this._googleProfile === null) {
      throw new Error('googleProfile cannot accessible');
    }

    return this._googleProfile;
  }
  
  get error(): IHttpGoogleApiProfileErrorResponse {
    if (this._error === null) {
      throw new Error('error cannot accessible');
    }

    return this._error;
  }
}
