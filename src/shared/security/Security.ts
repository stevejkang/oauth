import * as crypto from 'crypto';

const secret = 'LbN7bBGaYmNmcPNUrPKs2wTPvPT7cyew';

const secretKey = Buffer.from(secret, 'utf-8');
const iv = Buffer.from(secret.slice(0, 16), 'utf-8');

export class Security {
  private static readonly algorithm = 'aes-256-cbc';

  static encrypt(text: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, secretKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  static decrypt<T>(text: string): T {
    const decipher = crypto.createDecipheriv(this.algorithm, secretKey, iv);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted as T;
  }
}
