import { IHttpNaverApiProfileErrorResponse } from '../infrastructure/http/dto/IHttpNaverApiErrorResponse';
import { NaverProfile } from './NaverProfile';

export class NaverProfileOrError {
  private readonly _naverProfile: NaverProfile | null;
  private readonly _error: IHttpNaverApiProfileErrorResponse | null;

  constructor(
    naverProfile: NaverProfile | null, error: IHttpNaverApiProfileErrorResponse | null,
  ) {
    this._naverProfile = naverProfile;
    this._error = error;

    if (this._error === null && !(this._naverProfile instanceof NaverProfile)) {
      throw new Error('naverProfile must be instance of NaverProfile');
    }

    if (this._error !== null && (!('resultcode' in this._error) || !('message' in this._error))) {
      throw new Error('error must be instance of IHttpNaverApiProfileErrorResponse');
    }
  }

  public isError(): boolean {
    return this._error !== null;
  }

  get naverProfile(): NaverProfile {
    if (this._naverProfile === null) {
      throw new Error('naverProfile cannot accessible');
    }

    return this._naverProfile;
  }

  get error(): IHttpNaverApiProfileErrorResponse {
    if (this._error === null) {
      throw new Error('error cannot accessible');
    }

    return this._error;
  }
}
