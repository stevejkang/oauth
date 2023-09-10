import { IssueGoogleAuthorizationUrlUseCase } from './IssueGoogleAuthorizationUrlUseCase';

describe('IssueGoogleAuthorizationUrlUseCase', () => {
  let uut: IssueGoogleAuthorizationUrlUseCase;

  beforeAll(() => {
    uut = new IssueGoogleAuthorizationUrlUseCase();
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

    expect(result.url).toContain('https://accounts.google.com/o/oauth2/v2/auth');
    expect(result.url).toContain('response_type=code');
    expect(result.url).toContain('state=state');
    expect(result.url).toContain('nonce=nonce');
    expect(result.url).toContain('scope=openid+email');
  });
});
