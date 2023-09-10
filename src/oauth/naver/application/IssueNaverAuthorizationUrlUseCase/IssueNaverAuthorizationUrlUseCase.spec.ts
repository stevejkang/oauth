import { IssueNaverAuthorizationUrlUseCase } from './IssueNaverAuthorizationUrlUseCase';

describe('IssueNaverAuthorizationUrlUseCase', () => {
  let uut: IssueNaverAuthorizationUrlUseCase;

  beforeAll(() => {
    uut = new IssueNaverAuthorizationUrlUseCase();
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

    expect(result.url).toContain('https://nid.naver.com/oauth2.0/authorize');
    expect(result.url).toContain('response_type=code');
    expect(result.url).toContain('state=state');
  });
});
