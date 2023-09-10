import { Inject, Logger } from '@nestjs/common';
import { UseCase } from '../../../../shared/core/application/UseCase';
import { IssueKakaoAuthorizationTokenUseCaseRequest } from './dto/IssueKakaoAuthorizationTokenUseCaseRequest';
import { IssueKakaoAuthorizationTokenUseCaseResponse } from './dto/IssueKakaoAuthorizationTokenUseCaseResponse';
import { HTTP_KAKAO_API_REPOSITORY, KakaoApiRepository } from '../../infrastructure/KakaoApiRepository';

export class IssueKakaoAuthorizationTokenUseCase implements UseCase<IssueKakaoAuthorizationTokenUseCaseRequest, IssueKakaoAuthorizationTokenUseCaseResponse> {
  private readonly logger = new Logger(IssueKakaoAuthorizationTokenUseCase.name);

  constructor(
    @Inject(HTTP_KAKAO_API_REPOSITORY)
    private readonly httpKakaoApiRepository: KakaoApiRepository,
  ) {}

  async execute(request: IssueKakaoAuthorizationTokenUseCaseRequest): Promise<IssueKakaoAuthorizationTokenUseCaseResponse> {
    const kakaoOAuthTokenOrError = await this.httpKakaoApiRepository.getAccessToken(request.code);
    this.logger.log(JSON.stringify(kakaoOAuthTokenOrError));

    if (kakaoOAuthTokenOrError.isError()) {
      return { ok: false, token: null, error: `${kakaoOAuthTokenOrError.error.error}(${kakaoOAuthTokenOrError.error.error_description}, ${kakaoOAuthTokenOrError.error.error_code})` };
    }

    return { ok: true, token: kakaoOAuthTokenOrError.kakaoOAuthToken.accessToken, error: null };
  }
}
