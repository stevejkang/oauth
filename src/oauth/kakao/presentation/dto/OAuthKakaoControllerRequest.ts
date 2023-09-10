import { ApiProperty } from '@nestjs/swagger';

export class OAuthKakaoControllerReceiveLoginCallbackRequestQuery {
  @ApiProperty({
    type: String,
    name: 'code',
    description: '토큰 받기 요청에 필요한 인가 코드',
    required: false,
    nullable: false,
  })
  code?: string;

  @ApiProperty({
    type: String,
    name: 'state',
    description: '요청 시 전달한 state 값과 동일한 값',
    required: false,
    nullable: false,
  })
  state?: string;

  @ApiProperty({
    type: String,
    name: 'error',
    description: '인증 실패 시 반환되는 에러 코드',
    required: false,
    nullable: false,
  })
  error?: string;

  @ApiProperty({
    type: String,
    name: 'error_description',
    description: '인증 실패 시 반환되는 에러 메시지',
    required: false,
    nullable: false,
  })
  error_description?: string;
}

export class OAuthKakaoControllerLoginRequestBody {
  @ApiProperty({
    type: String,
    name: 'token',
    description: 'Client에서 받은 토큰 그대로 전달',
    required: true,
    nullable: false,
  })
  token: string;
}
