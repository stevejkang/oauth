import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/** Controllers */
import { OAuthNaverController } from './naver/presentation/OAuthNaverController';
import { OAuthKakaoController } from './kakao/presentation/OAuthKakaoController';
import { OAuthGoogleController } from './google/presentation/OAuthGoogleController';
/** Use cases */
import { IssueNaverAuthorizationUrlUseCase } from './naver/application/IssueNaverAuthorizationUrlUseCase/IssueNaverAuthorizationUrlUseCase';
import { IssueKakaoAuthorizationUrlUseCase } from './kakao/application/IssueKakaoAuthorizationUrlUseCase/IssueKakaoAuthorizationUrlUseCase';
import { IssueGoogleAuthorizationUrlUseCase } from './google/application/IssueGoogleAuthorizationUrlUseCase/IssueGoogleAuthorizationUrlUseCase';
import { IssueNaverAuthorizationTokenUseCase } from './naver/application/IssueNaverAuthorizationTokenUseCase/IssueNaverAuthorizationTokenUseCase';
import { IssueKakaoAuthorizationTokenUseCase } from './kakao/application/IssueKakaoAuthorizationTokenUseCase/IssueKakaoAuthorizationTokenUseCase';
import { IssueGoogleAuthorizationTokenUseCase } from './google/application/IssueGoogleAuthorizationTokenUseCase/IssueGoogleAuthorizationTokenUseCase';
import { RetrieveUserNaverProfileUseCase } from './naver/application/RetrieveUserNaverProfileUseCase/RetrieveUserNaverProfileUseCase';
import { RetrieveUserKakaoProfileUseCase } from './kakao/application/RetrieveUserKakaoProfileUseCase/RetrieveUserKakaoProfileUseCase';
import { RetrieveUserGoogleProfileUseCase } from './google/application/RetrieveUserGoogleProfileUseCase/RetrieveUserGoogleProfileUseCase';
/** Repositories */
import { HTTP_NAVER_API_REPOSITORY } from './naver/infrastructure/NaverApiRepository';
import { HttpNaverApiRepository } from './naver/infrastructure/http/HttpNaverApiRepository';
import { HTTP_KAKAO_API_REPOSITORY } from './kakao/infrastructure/KakaoApiRepository';
import { HttpKakaoApiRepository } from './kakao/infrastructure/http/HttpKakaoApiRepository';
import { HTTP_GOOGLE_API_REPOSITORY } from './google/infrastructure/GoogleApiRepository';
import { HttpGoogleApiRepository } from './google/infrastructure/http/HttpGoogleApiRepository';
import { NAVER_USER_REPOSITORY } from './naver/infrastructure/NaverUserRepository';
import { MysqlNaverUserRepository } from './naver/infrastructure/mysql/MysqlNaverUserRepository';
import { KAKAO_USER_REPOSITORY } from './kakao/infrastructure/KakaoUserRepository';
import { MysqlKakaoUserRepository } from './kakao/infrastructure/mysql/MysqlKakaoUserRepository';
import { GOOGLE_USER_REPOSITORY } from './google/infrastructure/GoogleUserRepository';
import { MysqlGoogleUserRepository } from './google/infrastructure/mysql/MysqlGoogleUserRepository';
/** Entities */
import { UserNaverEntity } from './naver/infrastructure/entities/UserNaverEntity';
import { UserKakaoEntity } from './kakao/infrastructure/entities/UserKakaoEntity';
import { UserGoogleEntity } from './google/infrastructure/entities/UserGoogleEntity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserNaverEntity,
      UserKakaoEntity,
      UserGoogleEntity,
    ]),
  ],
  controllers: [
    OAuthNaverController,
    OAuthKakaoController,
    OAuthGoogleController,
  ],
  providers: [
    IssueNaverAuthorizationUrlUseCase,
    IssueKakaoAuthorizationUrlUseCase,
    IssueGoogleAuthorizationUrlUseCase,
    IssueNaverAuthorizationTokenUseCase,
    IssueKakaoAuthorizationTokenUseCase,
    IssueGoogleAuthorizationTokenUseCase,
    RetrieveUserNaverProfileUseCase,
    RetrieveUserKakaoProfileUseCase,
    RetrieveUserGoogleProfileUseCase,
    {
      provide: HTTP_NAVER_API_REPOSITORY,
      useClass: HttpNaverApiRepository,
    },
    {
      provide: HTTP_KAKAO_API_REPOSITORY,
      useClass: HttpKakaoApiRepository,
    },
    {
      provide: HTTP_GOOGLE_API_REPOSITORY,
      useClass: HttpGoogleApiRepository,
    },
    {
      provide: NAVER_USER_REPOSITORY,
      useClass: MysqlNaverUserRepository,
    },
    {
      provide: KAKAO_USER_REPOSITORY,
      useClass: MysqlKakaoUserRepository,
    },
    {
      provide: GOOGLE_USER_REPOSITORY,
      useClass: MysqlGoogleUserRepository,
    },
  ],
})
export class OAuthModule {}
