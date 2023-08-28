import { Security } from './Security';

describe('Security', () => {
  const text = 'Hello World';
  it('encrypted text should be decrypted', () => {
    const encrypted = Security.encrypt(text);

    expect(Security.decrypt(encrypted)).toEqual(text);
  });
});
