import { IHttpKakaoApiProfileResponse } from '../infrastructure/http/dto/IHttpKakaoApiResponse';
import { IHttpKakaoApiProfileErrorResponse } from '../infrastructure/http/dto/IHttpKakaoApiErrorResponse';
import { KakaoProfileOrError } from './KakaoProfileOrError';
import { KakaoProfile } from './KakaoProfile';

describe('KakaoProfileOrError', () => {
  let successResponse: IHttpKakaoApiProfileResponse;
  let errorResponse: IHttpKakaoApiProfileErrorResponse;

  beforeAll(() => {
    successResponse = {
      id: 0,
      kakao_account: {
        is_email_valid: true,
        is_email_verified: true,
        email: 'email',
      },
    };

    errorResponse = {
      msg: 'msg',
      code: 0,
    };
  });

  it('should be throw error when kakaoProfile is not instance of KakaoProfile', () => {
    const kakaoProfile = null;

    expect(() => new KakaoProfileOrError(kakaoProfile, null)).toThrowError();
  });

  it('should be throw error when error is not instance of IHttpKakaoApiProfileErrorResponse', () => {
    const error = {
      wrong: 'wrong',
    } as unknown as IHttpKakaoApiProfileErrorResponse;

    expect(() => new KakaoProfileOrError(null, error)).toThrowError();
  });

  it('should be initialized with success response', () => {
    const hasBirthday = Boolean(successResponse.kakao_account?.birthyear) && Boolean(successResponse.kakao_account?.birthday);
    const kakaoProfile = KakaoProfile.createNew({
      uid: (successResponse.id || '').toString(),
      nickname: successResponse.kakao_account?.profile?.nickname || '',
      name: successResponse.kakao_account?.name || '',
      email: successResponse.kakao_account?.is_email_valid && successResponse.kakao_account?.is_email_verified ? successResponse.kakao_account?.email || '' : '',
      gender: successResponse.kakao_account?.gender || '',
      age: successResponse.kakao_account?.age_range || '',
      birthday: `${successResponse.kakao_account?.birthyear || ''}${hasBirthday ? '-' : ''}${successResponse.kakao_account?.birthday ? successResponse.kakao_account?.birthday.slice(0, 2) + successResponse.kakao_account?.birthday.slice(2) : ''}`,
      profileImageUrl: successResponse.kakao_account?.profile?.profile_image_url || '',
      phoneNumber: successResponse.kakao_account?.phone_number || '',
    }).value;

    const kakaoProfileOrError = new KakaoProfileOrError(kakaoProfile, null);

    expect(kakaoProfileOrError).toBeDefined();
    expect(kakaoProfileOrError.isError()).toBeFalsy();
    expect(kakaoProfileOrError.kakaoProfile).toBe(kakaoProfile);
    expect(() => kakaoProfileOrError.error).toThrowError();
  });

  it('should be initialized with error response', () => {
    const kakaoProfile = null;
    const kakaoProfileOrError = new KakaoProfileOrError(kakaoProfile, errorResponse);

    expect(kakaoProfileOrError).toBeDefined();
    expect(kakaoProfileOrError.isError()).toBeTruthy();
    expect(() => kakaoProfileOrError.kakaoProfile).toThrowError();
    expect(kakaoProfileOrError.error).toBe(errorResponse);
  });
});
