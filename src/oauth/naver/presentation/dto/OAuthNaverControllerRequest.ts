import { ApiProperty } from '@nestjs/swagger';

export class OAuthNaverControllerReceiveLoginCallbackRequestQuery {
  @ApiProperty({
    type: String,
    name: 'code',
    description: '네이버 로그인 인증에 성공하면 반환받는 인증 코드, 접근 토큰(access token) 발급에 사용',
    required: false,
    nullable: false,
  })
  code?: string;

  @ApiProperty({
    type: String,
    name: 'state',
    description: '사이트 간 요청 위조 공격을 방지하기 위해 애플리케이션에서 생성한 상태 토큰으로 URL 인코딩을 적용한 값',
    required: true,
    nullable: false,
  })
  state: string;

  @ApiProperty({
    type: String,
    name: 'error',
    description: '네이버 로그인 인증에 실패하면 반환받는 에러 코드',
    required: false,
    nullable: false,
  })
  error?: string;

  @ApiProperty({
    type: String,
    name: 'error_description',
    description: '네이버 로그인 인증에 실패하면 반환받는 에러 메시지',
    required: false,
    nullable: false,
  })
  error_description?: string;
}

export class OAuthNaverControllerLoginRequestBody {
  @ApiProperty({
    type: String,
    name: 'token',
    description: 'Client에서 받은 토큰 그대로 전달',
    required: true,
    nullable: false,
  })
  token: string;
}
