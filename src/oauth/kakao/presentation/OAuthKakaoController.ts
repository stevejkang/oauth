import { Body, Controller, Get, HttpCode, HttpStatus, InternalServerErrorException, Logger, Post, Query, Redirect, Req, UseFilters } from '@nestjs/common';
import { ApiFoundResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AllExceptionsFilter } from '../../../shared/filters/AllExceptionsFilter';
import { OAuthKakaoControllerLoginRequestBody, OAuthKakaoControllerReceiveLoginCallbackRequestQuery } from './dto/OAuthKakaoControllerRequest';
import { IssueKakaoAuthorizationUrlUseCase } from '../application/IssueKakaoAuthorizationUrlUseCase/IssueKakaoAuthorizationUrlUseCase';
import { IssueKakaoAuthorizationTokenUseCase } from '../application/IssueKakaoAuthorizationTokenUseCase/IssueKakaoAuthorizationTokenUseCase';
import { RetrieveUserKakaoProfileUseCase } from '../application/RetrieveUserKakaoProfileUseCase/RetrieveUserKakaoProfileUseCase';

@Controller('oauth/kakao')
@ApiTags('OAuth')
export class OAuthKakaoController {
  private readonly logger = new Logger(OAuthKakaoController.name);

  constructor(
    private readonly issueKakaoAuthorizationUrlUseCase: IssueKakaoAuthorizationUrlUseCase,
    private readonly issueKakaoAuthorizationTokenUseCase: IssueKakaoAuthorizationTokenUseCase,
    private readonly retrieveUserKakaoProfileUseCase: RetrieveUserKakaoProfileUseCase,
  ) {}

  @Get('login')
  @UseFilters(AllExceptionsFilter)
  @HttpCode(HttpStatus.FOUND)
  @Redirect()
  @ApiOperation({ summary: 'Redirect to kakao login authorization page' })
  @ApiFoundResponse({ description: 'Redirect to kakao login authorization page' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  getLogin() {
    try {
      const { ok, url } = this.issueKakaoAuthorizationUrlUseCase.execute();
      if (!ok) {
        throw new InternalServerErrorException();
      }

      return { url };
    } catch (error) {
      throw error;
    }
  }

  @Get('login/callback')
  @UseFilters(AllExceptionsFilter)
  @HttpCode(HttpStatus.FOUND)
  @Redirect()
  @ApiOperation({ summary: 'Receive callback from kakao authorization page and redirect to client with login token' })
  async receiveLoginCallback(
    @Query() query: OAuthKakaoControllerReceiveLoginCallbackRequestQuery,
  ) {
    try {
      const { code, state } = query;
      if (!code || !state) {
        return { url: `/login?error=VendorAuthorizationException&error_detail=${encodeURIComponent(`${query.error}(${query.error_description})`)}` };
      }

      const { ok, token, error } = await this.issueKakaoAuthorizationTokenUseCase.execute({ code: code });
      if (!ok) {
        return { url: `/login?error=VendorTokenIssuanceException&error_detail=${encodeURIComponent(error ?? '')}` };
      }

      return { url: `/login?token=${token}` };
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  @UseFilters(AllExceptionsFilter)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Process sign in or sign up using login token' })
  @ApiOkResponse({ description: 'Success to sign in or sign up' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async login(
    @Body() body: OAuthKakaoControllerLoginRequestBody,
    @Req() request: Request,
  ) {
    try {
      const { ok, profile } = await this.retrieveUserKakaoProfileUseCase.execute({ accessToken: body.token });
      if (!ok || !profile) {
        throw new InternalServerErrorException();
      }

      // TODO: Implement sign in or sign up logic

      return {
        statusCode: HttpStatus.OK,
        timestamp: new Date().toISOString(),
        path: request.url,
        ok: true,
        result: {
          accessToken: '',
          isNewUser: null,
        },
      };
    } catch (error) {
      this.logger.error(JSON.stringify(error));
      throw error;
    }
  }

  // /**
  //  * @description 카카오 로그인 보안 이벤트 구독
  //  * @description SSE(Shared Signals and Events, https://openid.net/wg/sharedsignals/) 규격에 맞는 SET(Security Events Token, https://datatracker.ietf.org/doc/html/rfc8417)을 받기 위한 endpoint
  //  * @see https://developers.kakao.com/docs/latest/ko/kakaologin/sse
  //  */
  // @Post('security-events')
  // @HttpCode(HttpStatus.ACCEPTED)
  // async receiveSecurityEventsCallback() {}
}
