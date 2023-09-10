import { GoogleProfile } from '../../../domain/GoogleProfile';
import { IHttpGoogleApiProfileResponse } from '../dto/IHttpGoogleApiResponse';

export class HttpGoogleApiRepositoryProfileMapper {
  static toDomain(response: IHttpGoogleApiProfileResponse): GoogleProfile {
    return GoogleProfile.createNew({
      uid: (response.sub || '').toString(),
      email: response.email_verified ? response.email || '' : '',
      profileImageUrl: response.picture || '',
    }).value;
  }
}
