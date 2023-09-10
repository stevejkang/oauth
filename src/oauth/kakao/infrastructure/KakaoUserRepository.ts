import { KakaoProfile } from '../domain/KakaoProfile';

export const KAKAO_USER_REPOSITORY = Symbol('KAKAO_USER_REPOSITORY');

export interface KakaoUserRepository {
  save(user: KakaoProfile): Promise<KakaoProfile>;
  findOne(uid: string): Promise<KakaoProfile | null>;
}
