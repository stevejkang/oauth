import { Inject, Logger } from '@nestjs/common';
import { UseCase } from '../../../../shared/core/application/UseCase';
import { RetrieveUserKakaoProfileUseCaseRequest } from './dto/RetrieveUserKakaoProfileUseCaseRequest';
import { RetrieveUserKakaoProfileUseCaseResponse } from './dto/RetrieveUserKakaoProfileUseCaseResponse';
import { HTTP_KAKAO_API_REPOSITORY, KakaoApiRepository } from '../../infrastructure/KakaoApiRepository';
import { KAKAO_USER_REPOSITORY, KakaoUserRepository } from '../../infrastructure/KakaoUserRepository';
import { KakaoProfile } from '../../domain/KakaoProfile';

export class RetrieveUserKakaoProfileUseCase implements UseCase<RetrieveUserKakaoProfileUseCaseRequest, RetrieveUserKakaoProfileUseCaseResponse> {
  private readonly logger = new Logger(RetrieveUserKakaoProfileUseCase.name);

  constructor(
    @Inject(HTTP_KAKAO_API_REPOSITORY)
    private readonly httpKakaoApiRepository: KakaoApiRepository,
    @Inject(KAKAO_USER_REPOSITORY)
    private readonly kakaoUserRepository: KakaoUserRepository,
  ) {}

  async execute(request: RetrieveUserKakaoProfileUseCaseRequest): Promise<RetrieveUserKakaoProfileUseCaseResponse> {
    const kakaoProfile = await this.httpKakaoApiRepository.getProfile(request.accessToken);
    this.logger.log(JSON.stringify(kakaoProfile));

    if (kakaoProfile.isError()) {
      this.logger.error(JSON.stringify(kakaoProfile.error));
      return { ok: false, profile: null };
    }

    const existUserProfile = await this.kakaoUserRepository.findOne(kakaoProfile.kakaoProfile.uid);
    const latestUserProfile = existUserProfile ? KakaoProfile.create({ ...kakaoProfile.kakaoProfile.props }, existUserProfile.id).value : kakaoProfile.kakaoProfile;

    await this.kakaoUserRepository.save(latestUserProfile);

    return { ok: true, profile: latestUserProfile };
  }
}
