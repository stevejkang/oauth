import { KakaoOAuthToken } from '../../../domain/KakaoOAuthToken';
import { IHttpKakaoApiTokenIssuanceResponse } from '../dto/IHttpKakaoApiResponse';

export class HttpKakaoApiRepositoryOAuthTokenMapper {
  static toDomain(response: IHttpKakaoApiTokenIssuanceResponse): KakaoOAuthToken {
    return KakaoOAuthToken.createNew({
      accessToken: response.access_token ?? '',
      refreshToken: response.refresh_token ?? '',
      tokenType: response.token_type ?? '',
      expiresIn: Number(response.expires_in ?? 0),
      idToken: response.id_token ?? '',
      scope: response.scope ?? '',
    }).value;
  }
}
