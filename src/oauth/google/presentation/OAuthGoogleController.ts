import { Body, Controller, Get, HttpCode, HttpStatus, InternalServerErrorException, Logger, Post, Query, Redirect, Req, UseFilters } from '@nestjs/common';
import { ApiFoundResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AllExceptionsFilter } from '../../../shared/filters/AllExceptionsFilter';
import { OAuthGoogleControllerLoginRequestBody, OAuthGoogleControllerReceiveLoginCallbackRequestQuery } from './dto/OAuthGoogleControllerRequest';
import { IssueGoogleAuthorizationUrlUseCase } from '../application/IssueGoogleAuthorizationUrlUseCase/IssueGoogleAuthorizationUrlUseCase';
import { IssueGoogleAuthorizationTokenUseCase } from '../application/IssueGoogleAuthorizationTokenUseCase/IssueGoogleAuthorizationTokenUseCase';
import { RetrieveUserGoogleProfileUseCase } from '../application/RetrieveUserGoogleProfileUseCase/RetrieveUserGoogleProfileUseCase';

@Controller('oauth/google')
@ApiTags('OAuth')
export class OAuthGoogleController {
  private readonly logger = new Logger(OAuthGoogleController.name);

  constructor(
    private readonly issueGoogleAuthorizationUrlUseCase: IssueGoogleAuthorizationUrlUseCase,
    private readonly issueGoogleAuthorizationTokenUseCase: IssueGoogleAuthorizationTokenUseCase,
    private readonly retrieveUserGoogleProfileUseCase: RetrieveUserGoogleProfileUseCase,
  ) {}

  @Get('login')
  @UseFilters(AllExceptionsFilter)
  @HttpCode(HttpStatus.FOUND)
  @Redirect()
  @ApiOperation({ summary: 'Redirect to google login authorization page' })
  @ApiFoundResponse({ description: 'Redirect to google login authorization page' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  getLogin() {
    try {
      const { ok, url } = this.issueGoogleAuthorizationUrlUseCase.execute();
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
  @ApiOperation({ summary: 'Receive callback from google authorization page and redirect to client with login token' })
  async receiveLoginCallback(
    @Query() query: OAuthGoogleControllerReceiveLoginCallbackRequestQuery,
  ) {
    try {
      const { code, state } = query;
      if (!code || !state) {
        return { url: '/login?error=VendorAuthorizationException&error_detail=' };
      }

      const { ok, token, error } = await this.issueGoogleAuthorizationTokenUseCase.execute({ code: code });
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
    @Body() body: OAuthGoogleControllerLoginRequestBody,
    @Req() request: Request,
  ) {
    try {
      const { ok, profile } = await this.retrieveUserGoogleProfileUseCase.execute({ accessToken: body.token });
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
