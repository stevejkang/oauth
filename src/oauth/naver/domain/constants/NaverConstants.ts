import { config } from '../../../../config';

export class NaverConstants {
  public static readonly OAUTH2_AUTHORIZATION_URL = 'https://nid.naver.com/oauth2.0/authorize';
  public static readonly OAUTH2_TOKEN_ISSUANCE_URL = 'https://nid.naver.com/oauth2.0/token';
  public static readonly OAUTH2_PROFILE_URL = 'https://openapi.naver.com/v1/nid/me';
  public static readonly OAUTH2_CLIENT_ID = config.OAUTH.NAVER.CLIENT_ID;
  public static readonly OAUTH2_CLIENT_SECRET = config.OAUTH.NAVER.CLIENT_SECRET;
  public static readonly OAUTH2_REDIRECT_URI = config.OAUTH.NAVER.REDIRECT_URI;
}
