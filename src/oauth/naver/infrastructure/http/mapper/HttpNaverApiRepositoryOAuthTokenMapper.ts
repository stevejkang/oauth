import { NaverOAuthToken } from '../../../domain/NaverOAuthToken';
import { IHttpNaverApiTokenIssuanceResponse } from '../dto/IHttpNaverApiResponse';

export class HttpNaverApiRepositoryOAuthTokenMapper {
  static toDomain(response: IHttpNaverApiTokenIssuanceResponse): NaverOAuthToken {
    return NaverOAuthToken.createNew({
      accessToken: response.access_token ?? '',
      refreshToken: response.refresh_token ?? '',
      expiresIn: Number(response.expires_in ?? 0),
      tokenType: response.token_type ?? '',
    }).value;
  }
}
