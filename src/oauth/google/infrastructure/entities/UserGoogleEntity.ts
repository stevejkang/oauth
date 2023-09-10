import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_google' })
export class UserGoogleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  ug_index: number;

  @Column()
  ug_uid: string;

  @Column()
  ug_email: string;

  @Column()
  ug_profile_image_url: string;

  @Column()
  ug_created_at: Date;

  @Column()
  ug_updated_at: Date;
}
