import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KakaoUserRepository } from '../KakaoUserRepository';
import { KakaoProfile } from '../../domain/KakaoProfile';
import { UserKakaoEntity } from '../entities/UserKakaoEntity';
import { MysqlKakaoUserRepositoryMapper } from './mapper/MysqlKakaoUserRepositoryMapper';

export class MysqlKakaoUserRepository implements KakaoUserRepository {
  constructor(
    @InjectRepository(UserKakaoEntity)
    private readonly userKakaoRepository: Repository<UserKakaoEntity>,
  ) {}

  async save(user: KakaoProfile): Promise<KakaoProfile> {
    if (user.id === 0) {
      const entity = await this.userKakaoRepository
        .createQueryBuilder()
        .insert()
        .into(UserKakaoEntity)
        .values({
          uk_uid: user.uid,
          uk_nickname: user.nickname,
          uk_name: user.name,
          uk_email: user.email,
          uk_gender: user.gender,
          uk_age: user.age,
          uk_birthday: user.birthday,
          uk_profile_image_url: user.profileImageUrl,
          uk_phone_number: user.phoneNumber,
        })
        .execute();

      const insertId = entity.raw.insertId;

      return KakaoProfile.create({ ...user.props }, insertId).value;
    } else {
      await this.userKakaoRepository
        .createQueryBuilder()
        .update(UserKakaoEntity)
        .set({
          uk_uid: user.uid,
          uk_nickname: user.nickname,
          uk_name: user.name,
          uk_email: user.email,
          uk_gender: user.gender,
          uk_age: user.age,
          uk_birthday: user.birthday,
          uk_profile_image_url: user.profileImageUrl,
          uk_phone_number: user.phoneNumber,
        })
        .execute();

      return user;
    }
  }

  async findOne(uid: string): Promise<KakaoProfile | null> {
    const entity = await this.userKakaoRepository
      .createQueryBuilder()
      .where('uk_uid = :uid', { uid })
      .getOne();

    if (!entity) {
      return null;
    }

    return MysqlKakaoUserRepositoryMapper.toDomain(entity);
  }
}
