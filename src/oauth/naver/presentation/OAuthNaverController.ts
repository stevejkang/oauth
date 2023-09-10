import { Body, Controller, Get, HttpCode, HttpStatus, InternalServerErrorException, Logger, Post, Query, Redirect, Req, UseFilters } from '@nestjs/common';
import { ApiFoundResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AllExceptionsFilter } from '../../../shared/filters/AllExceptionsFilter';
import { OAuthNaverControllerLoginRequestBody, OAuthNaverControllerReceiveLoginCallbackRequestQuery } from './dto/OAuthNaverControllerRequest';
import { IssueNaverAuthorizationUrlUseCase } from '../application/IssueNaverAuthorizationUrlUseCase/IssueNaverAuthorizationUrlUseCase';
import { IssueNaverAuthorizationTokenUseCase } from '../application/IssueNaverAuthorizationTokenUseCase/IssueNaverAuthorizationTokenUseCase';
import { RetrieveUserNaverProfileUseCase } from '../application/RetrieveUserNaverProfileUseCase/RetrieveUserNaverProfileUseCase';

@Controller('oauth/naver')
@ApiTags('OAuth')
export class OAuthNaverController {
  private readonly logger = new Logger(OAuthNaverController.name);

  constructor(
    private readonly issueNaverAuthorizationUrlUseCase: IssueNaverAuthorizationUrlUseCase,
    private readonly issueNaverAuthorizationTokenUseCase: IssueNaverAuthorizationTokenUseCase,
    private readonly retrieveUserNaverProfileUseCase: RetrieveUserNaverProfileUseCase,
  ) {}

  @Get('login')
  @UseFilters(AllExceptionsFilter)
  @HttpCode(HttpStatus.FOUND)
  @Redirect()
  @ApiOperation({ summary: 'Redirect to naver login authorization page' })
  @ApiFoundResponse({ description: 'Redirect to naver login authorization page' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  getLogin() {
    try {
      const { ok, url } = this.issueNaverAuthorizationUrlUseCase.execute();
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
  @ApiOperation({ summary: 'Receive callback from naver authorization page and redirect to client with login token' })
  async receiveLoginCallback(
    @Query() query: OAuthNaverControllerReceiveLoginCallbackRequestQuery,
  ) {
    try {
      const { code, state } = query;
      if (!code || !state) {
        return { url: `/login?error=VendorAuthorizationException&error_detail=${encodeURIComponent(`${query.error}(${query.error_description})`)}` };
      }

      const { ok, token, error } = await this.issueNaverAuthorizationTokenUseCase.execute({ code: code, state: state });
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
    @Body() body: OAuthNaverControllerLoginRequestBody,
    @Req() request: Request,
  ) {
    try {
      const { ok, profile } = await this.retrieveUserNaverProfileUseCase.execute({ accessToken: body.token });
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
}
