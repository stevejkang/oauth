import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleUserRepository } from '../GoogleUserRepository';
import { GoogleProfile } from '../../domain/GoogleProfile';
import { UserGoogleEntity } from '../entities/UserGoogleEntity';
import { MysqlGoogleUserRepositoryMapper } from './mapper/MysqlGoogleUserRepositoryMapper';

export class MysqlGoogleUserRepository implements GoogleUserRepository {
  constructor(
    @InjectRepository(UserGoogleEntity)
    private readonly userGoogleRepository: Repository<UserGoogleEntity>,
  ) {}

  async save(user: GoogleProfile): Promise<GoogleProfile> {
    if (user.id === 0) {
      const entity = await this.userGoogleRepository
        .createQueryBuilder()
        .insert()
        .into(UserGoogleEntity)
        .values({
          ug_uid: user.uid,
          ug_email: user.email,
          ug_profile_image_url: user.profileImageUrl,
        })
        .execute();

      const insertId = entity.raw.insertId;

      return GoogleProfile.create({ ...user.props }, insertId).value;
    } else {
      await this.userGoogleRepository
        .createQueryBuilder()
        .update(UserGoogleEntity)
        .set({
          ug_uid: user.uid,
          ug_email: user.email,
          ug_profile_image_url: user.profileImageUrl,
        })
        .execute();

      return user;
    }
  }

  async findOne(uid: string): Promise<GoogleProfile | null> {
    const entity = await this.userGoogleRepository
      .createQueryBuilder()
      .where('ug_uid = :uid', { uid })
      .getOne();

    if (!entity) {
      return null;
    }

    return MysqlGoogleUserRepositoryMapper.toDomain(entity);
  }
}
