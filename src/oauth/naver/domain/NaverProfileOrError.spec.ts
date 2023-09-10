import { IHttpNaverApiProfileResponse } from '../infrastructure/http/dto/IHttpNaverApiResponse';
import { IHttpNaverApiProfileErrorResponse } from '../infrastructure/http/dto/IHttpNaverApiErrorResponse';
import { NaverProfile } from './NaverProfile';
import { NaverProfileOrError } from './NaverProfileOrError';

describe('NaverProfileOrError', () => {
  let successResponse: IHttpNaverApiProfileResponse;
  let errorResponse: IHttpNaverApiProfileErrorResponse;

  beforeAll(() => {
    successResponse = {
      resultcode: 'resultcode',
      message: 'message',
      response: {
        id: 'id',
        email: 'email',
      },
    };

    errorResponse = {
      resultcode: 'resultcode',
      message: 'message',
    };
  });

  it('should be throw error when naverProfile is not instance of NaverProfile', () => {
    const naverProfile = null;

    expect(() => new NaverProfileOrError(naverProfile, null)).toThrowError();
  });

  it('should be throw error when error is not instance of IHttpNaverApiProfileErrorResponse', () => {
    const error = {
      wrong: 'wrong',
    } as unknown as IHttpNaverApiProfileErrorResponse;

    expect(() => new NaverProfileOrError(null, error)).toThrowError();
  });

  it('should be initialized with success response', () => {
    const naverProfile = NaverProfile.createNew({
      uid: successResponse.response?.id || '',
      nickname: successResponse.response?.nickname || '',
      name: successResponse.response?.name || '',
      email: successResponse.response?.email || '',
      gender: successResponse.response?.gender || '',
      age: successResponse.response?.age || '',
      birthday: successResponse.response?.birthday || '',
      profileImageUrl: successResponse.response?.profile_image || '',
      phoneNumber: successResponse.response?.mobile || '',
    }).value;

    const naverProfileOrError = new NaverProfileOrError(naverProfile, null);

    expect(naverProfileOrError).toBeDefined();
    expect(naverProfileOrError.isError()).toBeFalsy();
    expect(naverProfileOrError.naverProfile).toBe(naverProfile);
    expect(() => naverProfileOrError.error).toThrowError();
  });

  it('should be initialized with error response', () => {
    const naverProfile = null;

    const naverProfileOrError = new NaverProfileOrError(naverProfile, errorResponse);

    expect(naverProfileOrError).toBeDefined();
    expect(naverProfileOrError.isError()).toBeTruthy();
    expect(() => naverProfileOrError.naverProfile).toThrowError();
    expect(naverProfileOrError.error).toBe(errorResponse);
  });
});
