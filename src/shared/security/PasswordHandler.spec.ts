import { PasswordHandler } from './PasswordHandler';

describe('PasswordHandler', () => {
  it('should hash a password', async () => {
    const hashedPassword = await PasswordHandler.hashPassword('password');
    expect(hashedPassword).not.toBe('password');
  });
  it('should compare a password', async () => {
    const hashedPassword = await PasswordHandler.hashPassword('password');
    const isSame = await PasswordHandler.comparePasswords('password', hashedPassword);
    expect(isSame).toBe(true);
  });
});
