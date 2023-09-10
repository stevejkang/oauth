import { NaverOAuthToken } from './NaverOAuthToken';

describe('NaverOAuthToken', () => {
  let uut: NaverOAuthToken;

  beforeAll(() => {
    uut = NaverOAuthToken.createNew({
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      expiresIn: 1000,
      tokenType: 'tokenType',
    }).value;
  })

  it('should be initialized', () => {
    expect(uut).toBeDefined();
  });

  it('should have properties', () => {
    expect(uut.accessToken).toBe('accessToken');
    expect(uut.refreshToken).toBe('refreshToken');
    expect(uut.expiresIn).toBe(1000);
    expect(uut.tokenType).toBe('tokenType');
  });
});
