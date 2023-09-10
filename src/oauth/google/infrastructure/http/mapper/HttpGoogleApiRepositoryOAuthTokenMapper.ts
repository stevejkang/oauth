import { GoogleOAuthToken } from '../../../domain/GoogleOAuthToken';
import { IHttpGoogleApiTokenIssuanceResponse } from '../dto/IHttpGoogleApiResponse';

export class HttpGoogleApiRepositoryOAuthTokenMapper {
  static toDomain(response: IHttpGoogleApiTokenIssuanceResponse): GoogleOAuthToken {
    return GoogleOAuthToken.createNew({
      accessToken: response.access_token ?? '',
      tokenType: response.token_type ?? '',
      expiresIn: Number(response.expires_in ?? 0),
      idToken: response.id_token ?? '',
      scope: response.scope ?? '',
    }).value;
  }
}
