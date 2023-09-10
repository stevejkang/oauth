import { NaverProfile } from './NaverProfile';

describe('NaverProfile', () => {
  let uut: NaverProfile;

  beforeAll(() => {
    uut = NaverProfile.createNew({
      uid: 'uid',
      nickname: 'nickname',
      name: 'name',
      email: 'email',
      gender: 'gender',
      age: 'age',
      birthday: 'birthday',
      profileImageUrl: 'profileImageUrl',
      phoneNumber: 'phoneNumber',
    }).value;
  });

  it('should be initialized', () => {
    expect(uut).toBeDefined();
  });

  it('should have properties', () => {
    expect(uut.uid).toBe('uid');
    expect(uut.nickname).toBe('nickname');
    expect(uut.name).toBe('name');
    expect(uut.email).toBe('email');
    expect(uut.gender).toBe('gender');
    expect(uut.age).toBe('age');
    expect(uut.birthday).toBe('birthday');
    expect(uut.profileImageUrl).toBe('profileImageUrl');
    expect(uut.phoneNumber).toBe('phoneNumber');
  });
});
