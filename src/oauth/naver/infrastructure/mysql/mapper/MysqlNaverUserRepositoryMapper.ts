import { UserNaverEntity } from '../../entities/UserNaverEntity';
import { NaverProfile } from '../../../domain/NaverProfile';

export class MysqlNaverUserRepositoryMapper {
  static toDomain(entity: UserNaverEntity): NaverProfile {
    return NaverProfile.create(
      {
        uid: entity.un_uid,
        nickname: entity.un_nickname,
        name: entity.un_name,
        email: entity.un_email,
        gender: entity.un_gender,
        age: entity.un_age,
        birthday: entity.un_birthday,
        profileImageUrl: entity.un_profile_image_url,
        phoneNumber: entity.un_phone_number,
      },
      entity.un_index,
    ).value;
  }
}
