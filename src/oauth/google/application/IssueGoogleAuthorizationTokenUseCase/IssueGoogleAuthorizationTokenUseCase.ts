import { Inject, Logger } from '@nestjs/common';
import { UseCase } from '../../../../shared/core/application/UseCase';
import { IssueGoogleAuthorizationTokenUseCaseRequest } from './dto/IssueGoogleAuthorizationTokenUseCaseRequest';
import { IssueGoogleAuthorizationTokenUseCaseResponse } from './dto/IssueGoogleAuthorizationTokenUseCaseResponse';
import { GoogleApiRepository, HTTP_GOOGLE_API_REPOSITORY } from '../../infrastructure/GoogleApiRepository';

export class IssueGoogleAuthorizationTokenUseCase implements UseCase<IssueGoogleAuthorizationTokenUseCaseRequest, IssueGoogleAuthorizationTokenUseCaseResponse> {
  private readonly logger = new Logger(IssueGoogleAuthorizationTokenUseCase.name);

  constructor(
    @Inject(HTTP_GOOGLE_API_REPOSITORY)
    private readonly httpGoogleApiRepository: GoogleApiRepository,
  ) {}

  async execute(request: IssueGoogleAuthorizationTokenUseCaseRequest): Promise<IssueGoogleAuthorizationTokenUseCaseResponse> {
    const googleOAuthTokenOrError = await this.httpGoogleApiRepository.getAccessToken(request.code);
    this.logger.log(JSON.stringify(googleOAuthTokenOrError));

    if (googleOAuthTokenOrError.isError()) {
      return { ok: false, token: null, error: `${googleOAuthTokenOrError.error.error}(${googleOAuthTokenOrError.error.error_description})` };
    }

    return { ok: true, token: googleOAuthTokenOrError.googleOAuthToken.accessToken, error: null };
  }
}
