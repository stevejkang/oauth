import { Inject, Logger } from '@nestjs/common';
import { UseCase } from '../../../../shared/core/application/UseCase';
import { RetrieveUserNaverProfileUseCaseRequest } from './dto/RetrieveUserNaverProfileUseCaseRequest';
import { RetrieveUserNaverProfileUseCaseResponse } from './dto/RetrieveUserNaverProfileUseCaseResponse';
import { HTTP_NAVER_API_REPOSITORY, NaverApiRepository } from '../../infrastructure/NaverApiRepository';
import { NAVER_USER_REPOSITORY, NaverUserRepository } from '../../infrastructure/NaverUserRepository';
import { NaverProfile } from '../../domain/NaverProfile';

export class RetrieveUserNaverProfileUseCase implements UseCase<RetrieveUserNaverProfileUseCaseRequest, RetrieveUserNaverProfileUseCaseResponse> {
  private readonly logger = new Logger(RetrieveUserNaverProfileUseCase.name);

  constructor(
    @Inject(HTTP_NAVER_API_REPOSITORY)
    private readonly httpNaverApiRepository: NaverApiRepository,
    @Inject(NAVER_USER_REPOSITORY)
    private readonly naverUserRepository: NaverUserRepository,
  ) {}

  async execute(request: RetrieveUserNaverProfileUseCaseRequest): Promise<RetrieveUserNaverProfileUseCaseResponse> {
    const naverProfile = await this.httpNaverApiRepository.getProfile(request.accessToken);
    this.logger.log(JSON.stringify(naverProfile));

    if (naverProfile.isError()) {
      this.logger.error(JSON.stringify(naverProfile.error));
      return { ok: false, profile: null };
    }

    const existUserProfile = await this.naverUserRepository.findOne(naverProfile.naverProfile.uid);
    const latestUserProfile = existUserProfile ? NaverProfile.create({ ...naverProfile.naverProfile.props }, existUserProfile.id).value : naverProfile.naverProfile;

    await this.naverUserRepository.save(latestUserProfile);

    return { ok: true, profile: latestUserProfile };
  }
}
