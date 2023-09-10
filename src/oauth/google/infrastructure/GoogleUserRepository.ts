import { GoogleProfile } from '../domain/GoogleProfile';

export const GOOGLE_USER_REPOSITORY = Symbol('GOOGLE_USER_REPOSITORY');

export interface GoogleUserRepository {
  save(user: GoogleProfile): Promise<GoogleProfile>;
  findOne(uid: string): Promise<GoogleProfile | null>;
}
