import { UserKakaoEntity } from '../../entities/UserKakaoEntity';
import { KakaoProfile } from '../../../domain/KakaoProfile';

export class MysqlKakaoUserRepositoryMapper {
  static toDomain(entity: UserKakaoEntity): KakaoProfile {
    return KakaoProfile.create(
      {
        uid: entity.uk_uid,
        nickname: entity.uk_nickname,
        name: entity.uk_name,
        email: entity.uk_email,
        gender: entity.uk_gender,
        age: entity.uk_age,
        birthday: entity.uk_birthday,
        profileImageUrl: entity.uk_profile_image_url,
        phoneNumber: entity.uk_phone_number,
      },
      entity.uk_index,
    ).value;
  }
}
