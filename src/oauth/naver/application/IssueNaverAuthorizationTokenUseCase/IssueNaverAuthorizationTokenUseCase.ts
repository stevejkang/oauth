import { Inject, Logger } from '@nestjs/common';
import { UseCase } from '../../../../shared/core/application/UseCase';
import { IssueNaverAuthorizationTokenUseCaseRequest } from './dto/IssueNaverAuthorizationTokenUseCaseRequest';
import { IssueNaverAuthorizationTokenUseCaseResponse } from './dto/IssueNaverAuthorizationTokenUseCaseResponse';
import { HTTP_NAVER_API_REPOSITORY, NaverApiRepository } from '../../infrastructure/NaverApiRepository';

export class IssueNaverAuthorizationTokenUseCase implements UseCase<IssueNaverAuthorizationTokenUseCaseRequest, IssueNaverAuthorizationTokenUseCaseResponse> {
  private readonly logger = new Logger(IssueNaverAuthorizationTokenUseCase.name);

  constructor(
    @Inject(HTTP_NAVER_API_REPOSITORY)
    private readonly httpNaverApiRepository: NaverApiRepository,
  ) {}

  async execute(request: IssueNaverAuthorizationTokenUseCaseRequest): Promise<IssueNaverAuthorizationTokenUseCaseResponse> {
    const naverOAuthTokenOrError = await this.httpNaverApiRepository.getAccessToken(request.code, request.state);
    this.logger.log(JSON.stringify(naverOAuthTokenOrError));

    if (naverOAuthTokenOrError.isError()) {
      return { ok: false, token: null, error: `${naverOAuthTokenOrError.error.error}(${naverOAuthTokenOrError.error.error_description})` };
    }

    return { ok: true, token: naverOAuthTokenOrError.naverOAuthToken.accessToken, error: null };
  }
}
