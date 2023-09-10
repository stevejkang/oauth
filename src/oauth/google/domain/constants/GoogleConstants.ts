import { config } from '../../../../config';

export class GoogleConstants {
  public static readonly OAUTH2_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
  public static readonly OAUTH2_TOKEN_ISSUANCE_URL = 'https://oauth2.googleapis.com/token';
  public static readonly OAUTH2_PROFILE_URL = 'https://openidconnect.googleapis.com/v1/userinfo';
  public static readonly OAUTH2_CLIENT_ID = config.OAUTH.GOOGLE.CLIENT_ID;
  public static readonly OAUTH2_CLIENT_SECRET = config.OAUTH.GOOGLE.CLIENT_SECRET;
  public static readonly OAUTH2_REDIRECT_URI = config.OAUTH.GOOGLE.REDIRECT_URI;
}
