import { NaverProfile } from '../../../domain/NaverProfile';
import { IHttpNaverApiProfileResponse } from '../dto/IHttpNaverApiResponse';

export class HttpNaverApiRepositoryProfileMapper {
  static toDomain(response: IHttpNaverApiProfileResponse): NaverProfile | null {
    if (!response.response) {
      return null;
    }

    return NaverProfile.createNew({
      uid: response.response.id || '',
      nickname: response.response.nickname || '',
      name: response.response.name || '',
      email: response.response.email,
      gender: response.response.gender || '',
      age: response.response.age || '',
      birthday: `${response.response.birthyear || ''}${response.response.birthyear && response.response.birthday ? '-' : ''}${response.response.birthday || ''}`,
      profileImageUrl: response.response.profile_image || '',
      phoneNumber: response.response.mobile || '',
    }).value;
  }
}
