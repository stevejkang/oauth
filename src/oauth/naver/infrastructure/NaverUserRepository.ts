import { NaverProfile } from '../domain/NaverProfile';

export const NAVER_USER_REPOSITORY = Symbol('NAVER_USER_REPOSITORY');

export interface NaverUserRepository {
  save(user: NaverProfile): Promise<NaverProfile>;
  findOne(uid: string): Promise<NaverProfile | null>;
}
