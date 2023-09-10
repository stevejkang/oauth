import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../../shared/core/application/UseCase';
import { IssueKakaoAuthorizationUrlUseCaseResponse } from './dto/IssueKakaoAuthorizationUrlUseCaseResponse';
import { KakaoConstants } from '../../domain/constants/KakaoConstants';

@Injectable()
export class IssueKakaoAuthorizationUrlUseCase implements UseCase<void, IssueKakaoAuthorizationUrlUseCaseResponse> {
  constructor() {}

  execute(): IssueKakaoAuthorizationUrlUseCaseResponse {
    const url = new URL(KakaoConstants.OAUTH2_AUTHORIZATION_URL);
    url.searchParams.append('client_id', KakaoConstants.OAUTH2_CLIENT_ID);
    url.searchParams.append('redirect_uri', KakaoConstants.OAUTH2_REDIRECT_URI);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('state', 'state'); // TODO: Refactor
    url.searchParams.append('nonce', 'nonce'); // TODO: Refactor
    url.searchParams.append('scope', 'openid');

    return { ok: true, url: url.href };
  }
}
