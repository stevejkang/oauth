import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_naver' })
export class UserNaverEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  un_index: number;

  @Column()
  un_uid: string;

  @Column()
  un_nickname: string;

  @Column()
  un_name: string;

  @Column()
  un_email: string;

  @Column()
  un_gender: string;

  @Column()
  un_age: string;

  @Column()
  un_birthday: string;

  @Column()
  un_profile_image_url: string;

  @Column()
  un_phone_number: string;

  @Column()
  un_created_at: Date;

  @Column()
  un_updated_at: Date;
}
