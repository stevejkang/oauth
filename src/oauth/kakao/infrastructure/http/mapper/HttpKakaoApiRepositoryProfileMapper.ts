import { KakaoProfile } from '../../../domain/KakaoProfile';
import { IHttpKakaoApiProfileResponse } from '../dto/IHttpKakaoApiResponse';

export class HttpKakaoApiRepositoryProfileMapper {
  static toDomain(response: IHttpKakaoApiProfileResponse): KakaoProfile | null {
    if (!response.kakao_account) {
      return null;
    }

    const hasBirthday = Boolean(response.kakao_account.birthyear) && Boolean(response.kakao_account.birthday);

    return KakaoProfile.createNew({
      uid: (response.id || '').toString(),
      nickname: response.kakao_account.profile?.nickname || '',
      name: response.kakao_account.name || '',
      email: response.kakao_account.is_email_valid && response.kakao_account.is_email_verified ? response.kakao_account.email || '' : '',
      gender: response.kakao_account.gender || '',
      age: response.kakao_account.age_range || '',
      birthday: `${response.kakao_account.birthyear || ''}${hasBirthday ? '-' : ''}${response.kakao_account.birthday ? response.kakao_account.birthday.slice(0, 2) + response.kakao_account.birthday.slice(2) : ''}`,
      profileImageUrl: response.kakao_account.profile?.profile_image_url || '',
      phoneNumber: response.kakao_account.phone_number || '',
    }).value;
  }
}
