import { GoogleOAuthToken } from './GoogleOAuthToken';

describe('GoogleOAuthToken', () => {
  let uut: GoogleOAuthToken;

  beforeAll(() => {
    uut = GoogleOAuthToken.createNew({
      accessToken: 'accessToken',
      tokenType: 'tokenType',
      expiresIn: 0,
      idToken: 'idToken',
      scope: 'scope',
    }).value;
  });

  it('should be initialized', () => {
    expect(uut).toBeDefined();
  });

  it('should have properties', () => {
    expect(uut.accessToken).toBe('accessToken');
    expect(uut.tokenType).toBe('tokenType');
    expect(uut.expiresIn).toBe(0);
    expect(uut.idToken).toBe('idToken');
    expect(uut.scope).toBe('scope');
  });
});
