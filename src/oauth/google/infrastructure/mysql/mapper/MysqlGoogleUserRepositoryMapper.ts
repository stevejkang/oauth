import { UserGoogleEntity } from '../../entities/UserGoogleEntity';
import { GoogleProfile } from '../../../domain/GoogleProfile';

export class MysqlGoogleUserRepositoryMapper {
  static toDomain(entity: UserGoogleEntity): GoogleProfile {
    return GoogleProfile.create(
      {
        uid: entity.ug_uid,
        email: entity.ug_email,
        profileImageUrl: entity.ug_profile_image_url,
      },
      entity.ug_index,
    ).value;
  }
}
