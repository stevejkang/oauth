import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../../shared/core/application/UseCase';
import { IssueGoogleAuthorizationUrlUseCaseResponse } from './dto/IssueGoogleAuthorizationUrlUseCaseResponse';
import { GoogleConstants } from '../../domain/constants/GoogleConstants';

@Injectable()
export class IssueGoogleAuthorizationUrlUseCase implements UseCase<void, IssueGoogleAuthorizationUrlUseCaseResponse> {
  constructor() {}

  execute(): IssueGoogleAuthorizationUrlUseCaseResponse {
    const url = new URL(GoogleConstants.OAUTH2_AUTHORIZATION_URL);
    url.searchParams.append('client_id', GoogleConstants.OAUTH2_CLIENT_ID);
    url.searchParams.append('redirect_uri', GoogleConstants.OAUTH2_REDIRECT_URI);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('state', 'state'); // TODO: Refactor
    url.searchParams.append('nonce', 'nonce'); // TODO: Refactor
    url.searchParams.append('scope', 'openid email');

    return { ok: true, url: url.href };
  }
}
