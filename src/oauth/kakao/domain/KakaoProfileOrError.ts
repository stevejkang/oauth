import { IHttpKakaoApiProfileErrorResponse } from '../infrastructure/http/dto/IHttpKakaoApiErrorResponse';
import { KakaoProfile } from './KakaoProfile';

export class KakaoProfileOrError {
  private readonly _kakaoProfile: KakaoProfile | null;
  private readonly _error: IHttpKakaoApiProfileErrorResponse | null;

  constructor(
    kakaoProfile: KakaoProfile | null, error: IHttpKakaoApiProfileErrorResponse | null,
  ) {
    this._kakaoProfile = kakaoProfile;
    this._error = error;

    if (this._error === null && !(this._kakaoProfile instanceof KakaoProfile)) {
      throw new Error('kakaoProfile must be instance of KakaoProfile');
    }

    if (this._error !== null && (!('msg' in this._error) || !('code' in this._error))) {
      throw new Error('error must be instance of IHttpKakaoApiProfileErrorResponse');
    }
  }

  public isError(): boolean {
    return this._error !== null;
  }

  get kakaoProfile(): KakaoProfile {
    if (this._kakaoProfile === null) {
      throw new Error('kakaoProfile cannot accessible');
    }

    return this._kakaoProfile;
  }

  get error(): IHttpKakaoApiProfileErrorResponse {
    if (this._error === null) {
      throw new Error('error cannot accessible');
    }

    return this._error;
  }
}
