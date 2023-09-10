import { config } from '../../../../config';

export class KakaoConstants {
  public static readonly OAUTH2_AUTHORIZATION_URL = 'https://kauth.kakao.com/oauth/authorize';
  public static readonly OAUTH2_TOKEN_ISSUANCE_URL = 'https://kauth.kakao.com/oauth/token';
  public static readonly OAUTH2_PROFILE_URL = 'https://kapi.kakao.com/v2/user/me';
  public static readonly OAUTH2_CLIENT_ID = config.OAUTH.KAKAO.CLIENT_ID;
  public static readonly OAUTH2_CLIENT_SECRET = config.OAUTH.KAKAO.CLIENT_SECRET;
  public static readonly OAUTH2_REDIRECT_URI = config.OAUTH.KAKAO.REDIRECT_URI;
}
