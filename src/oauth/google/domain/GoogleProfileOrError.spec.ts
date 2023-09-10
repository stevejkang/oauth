import { IHttpGoogleApiProfileResponse } from '../infrastructure/http/dto/IHttpGoogleApiResponse';
import { IHttpGoogleApiProfileErrorResponse } from '../infrastructure/http/dto/IHttpGoogleApiErrorResponse';
import { GoogleProfileOrError } from './GoogleProfileOrError';
import { GoogleProfile } from './GoogleProfile';

describe('GoogleProfileOrError', () => {
  let successResponse: IHttpGoogleApiProfileResponse;
  let errorResponse: IHttpGoogleApiProfileErrorResponse;

  beforeAll(() => {
    successResponse = {
      sub: 'sub',
      email: 'email',
      email_verified: true,
      picture: 'picture',
    };

    errorResponse = {
      error: 'error',
      error_description: 'error_description',
    };
  });

  it('should be throw error when googleProfile is not instance of GoogleProfile', () => {
    const googleProfile = null;

    expect(() => new GoogleProfileOrError(googleProfile, null)).toThrowError();
  });

  it('should be throw error when error is not instance of IHttpGoogleApiProfileErrorResponse', () => {
    const error = {
      wrong: 'wrong',
    } as unknown as IHttpGoogleApiProfileErrorResponse;

    expect(() => new GoogleProfileOrError(null, error)).toThrowError();
  });

  it('should be initialized with success response', () => {
    const googleProfile = GoogleProfile.createNew({
      uid: (successResponse.sub || '').toString(),
      email: successResponse.email_verified ? successResponse.email || '' : '',
      profileImageUrl: successResponse.picture || '',
    }).value;

    const googleProfileOrError = new GoogleProfileOrError(googleProfile, null);

    expect(googleProfileOrError).toBeDefined();
    expect(googleProfileOrError.isError()).toBeFalsy();
    expect(googleProfileOrError.googleProfile).toBe(googleProfile);
    expect(() => googleProfileOrError.error).toThrowError();
  });

  it('should be initialized with error response', () => {
    const googleProfile = null;

    const googleProfileOrError = new GoogleProfileOrError(googleProfile, errorResponse);

    expect(googleProfileOrError).toBeDefined();
    expect(googleProfileOrError.isError()).toBeTruthy();
    expect(() => googleProfileOrError.googleProfile).toThrowError();
    expect(googleProfileOrError.error).toBe(errorResponse);
  });
});
