import { Inject, Logger } from '@nestjs/common';
import { UseCase } from '../../../../shared/core/application/UseCase';
import { RetrieveUserGoogleProfileUseCaseRequest } from './dto/RetrieveUserGoogleProfileUseCaseRequest';
import { RetrieveUserGoogleProfileUseCaseResponse } from './dto/RetrieveUserGoogleProfileUseCaseResponse';
import { HTTP_GOOGLE_API_REPOSITORY, GoogleApiRepository } from '../../infrastructure/GoogleApiRepository';
import { GOOGLE_USER_REPOSITORY, GoogleUserRepository } from '../../infrastructure/GoogleUserRepository';
import { GoogleProfile } from '../../domain/GoogleProfile';

export class RetrieveUserGoogleProfileUseCase implements UseCase<RetrieveUserGoogleProfileUseCaseRequest, RetrieveUserGoogleProfileUseCaseResponse> {
  private readonly logger = new Logger(RetrieveUserGoogleProfileUseCase.name);

  constructor(
    @Inject(HTTP_GOOGLE_API_REPOSITORY)
    private readonly httpGoogleApiRepository: GoogleApiRepository,
    @Inject(GOOGLE_USER_REPOSITORY)
    private readonly googleUserRepository: GoogleUserRepository,
  ) {}

  async execute(request: RetrieveUserGoogleProfileUseCaseRequest): Promise<RetrieveUserGoogleProfileUseCaseResponse> {
    const googleProfile = await this.httpGoogleApiRepository.getProfile(request.accessToken);
    this.logger.log(JSON.stringify(googleProfile));

    if (googleProfile.isError()) {
      this.logger.error(JSON.stringify(googleProfile.error));
      return { ok: false, profile: null };
    }

    const existUserProfile = await this.googleUserRepository.findOne(googleProfile.googleProfile.uid);
    const latestUserProfile = existUserProfile ? GoogleProfile.create({ ...googleProfile.googleProfile.props }, existUserProfile.id).value : googleProfile.googleProfile;

    await this.googleUserRepository.save(latestUserProfile);

    return { ok: true, profile: latestUserProfile };
  }
}
