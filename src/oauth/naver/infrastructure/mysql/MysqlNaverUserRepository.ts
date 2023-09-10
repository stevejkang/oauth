import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NaverUserRepository } from '../NaverUserRepository';
import { NaverProfile } from '../../domain/NaverProfile';
import { UserNaverEntity } from '../entities/UserNaverEntity';
import { MysqlNaverUserRepositoryMapper } from './mapper/MysqlNaverUserRepositoryMapper';

export class MysqlNaverUserRepository implements NaverUserRepository {
  constructor(
    @InjectRepository(UserNaverEntity)
    private readonly userNaverRepository: Repository<UserNaverEntity>,
  ) {}

  async save(user: NaverProfile): Promise<NaverProfile> {
    if (user.id === 0) {
      const entity = await this.userNaverRepository
        .createQueryBuilder()
        .insert()
        .into(UserNaverEntity)
        .values({
          un_uid: user.uid,
          un_nickname: user.nickname,
          un_name: user.name,
          un_email: user.email,
          un_gender: user.gender,
          un_age: user.age,
          un_birthday: user.birthday,
          un_profile_image_url: user.profileImageUrl,
          un_phone_number: user.phoneNumber,
        })
        .execute();

      const insertId = entity.raw.insertId;

      return NaverProfile.create({ ...user.props }, insertId).value;
    } else {
      await this.userNaverRepository
        .createQueryBuilder()
        .update(UserNaverEntity)
        .set({
          un_uid: user.uid,
          un_nickname: user.nickname,
          un_name: user.name,
          un_email: user.email,
          un_gender: user.gender,
          un_age: user.age,
          un_birthday: user.birthday,
          un_profile_image_url: user.profileImageUrl,
          un_phone_number: user.phoneNumber,
        })
        .execute();

      return user;
    }
  }

  async findOne(uid: string): Promise<NaverProfile | null> {
    const entity = await this.userNaverRepository
      .createQueryBuilder()
      .where('un_uid = :uid', { uid })
      .getOne();

    if (!entity) {
      return null;
    }

    return MysqlNaverUserRepositoryMapper.toDomain(entity);
  }
}
