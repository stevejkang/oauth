import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_kakao' })
export class UserKakaoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  uk_index: number;

  @Column()
  uk_uid: string;

  @Column()
  uk_nickname: string;

  @Column()
  uk_name: string;

  @Column()
  uk_email: string;

  @Column()
  uk_gender: string;

  @Column()
  uk_age: string;

  @Column()
  uk_birthday: string;

  @Column()
  uk_profile_image_url: string;

  @Column()
  uk_phone_number: string;

  @Column()
  uk_created_at: Date;

  @Column()
  uk_updated_at: Date;
}
