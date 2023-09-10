import { KakaoOAuthToken } from './KakaoOAuthToken';

describe('KakaoOAuthToken', () => {
  let uut: KakaoOAuthToken;

  beforeAll(() => {
    uut = KakaoOAuthToken.createNew({
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      tokenType: 'tokenType',
      expiresIn: 0,
      idToken: null,
      scope: null,
    }).value;
  });

  it('should be initialized', () => {
    expect(uut).toBeDefined();
  });

  it('should have properties', () => {
    expect(uut.accessToken).toBe('accessToken');
    expect(uut.refreshToken).toBe('refreshToken');
    expect(uut.tokenType).toBe('tokenType');
    expect(uut.expiresIn).toBe(0);
    expect(uut.idToken).toBeDefined();
    expect(uut.scope).toBeDefined();
  });
});
