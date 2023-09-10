import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../../shared/core/application/UseCase';
import { IssueNaverAuthorizationUrlUseCaseResponse } from './dto/IssueNaverAuthorizationUrlUseCaseResponse';
import { NaverConstants } from '../../domain/constants/NaverConstants';

@Injectable()
export class IssueNaverAuthorizationUrlUseCase implements UseCase<void, IssueNaverAuthorizationUrlUseCaseResponse> {
  constructor() {}

  execute(): IssueNaverAuthorizationUrlUseCaseResponse {
    const url = new URL(NaverConstants.OAUTH2_AUTHORIZATION_URL);
    url.searchParams.append('client_id', NaverConstants.OAUTH2_CLIENT_ID);
    url.searchParams.append('redirect_uri', NaverConstants.OAUTH2_REDIRECT_URI);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('state', 'state'); // TODO: Refactor

    return { ok: true, url: url.href };
  }
}
