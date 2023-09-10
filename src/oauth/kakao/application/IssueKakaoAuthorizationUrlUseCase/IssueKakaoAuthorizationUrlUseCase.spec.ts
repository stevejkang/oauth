import { IssueKakaoAuthorizationUrlUseCase } from './IssueKakaoAuthorizationUrlUseCase';

describe('IssueKakaoAuthorizationUrlUseCase', () => {
  let uut: IssueKakaoAuthorizationUrlUseCase;

  beforeAll(() => {
    uut = new IssueKakaoAuthorizationUrlUseCase();
  });

  it('should be defined', () => {
    expect(uut).toBeDefined();
  });

  it('should return url', () => {
    const result = uut.execute();

    expect(result.ok).toBe(true);
    expect(result.url).toBeDefined();
  });

  it('result url should be valid', () => {
    const result = uut.execute();

    expect(result.url).toContain('https://kauth.kakao.com/oauth/authorize');
    expect(result.url).toContain('response_type=code');
    expect(result.url).toContain('state=state');
    expect(result.url).toContain('nonce=nonce');
    expect(result.url).toContain('scope=openid');
  });
});
