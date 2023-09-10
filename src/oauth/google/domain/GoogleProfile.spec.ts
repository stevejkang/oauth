import { GoogleProfile } from './GoogleProfile';

describe('GoogleProfile', () => {
  let uut: GoogleProfile;

  beforeAll(() => {
    uut = GoogleProfile.createNew({
      uid: 'uid',
      email: 'email',
      profileImageUrl: 'profileImageUrl',
    }).value;
  });

  it('should be initialized', () => {
    expect(uut).toBeDefined();
  });

  it('should have properties', () => {
    expect(uut.uid).toBe('uid');
    expect(uut.email).toBe('email');
    expect(uut.profileImageUrl).toBe('profileImageUrl');
  });
});
