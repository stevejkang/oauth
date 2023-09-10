import { AggregateRoot } from '../../../shared/core/domain/AggregateRoot';
import { Result } from '../../../shared/core/domain/Result';

interface KakaoOAuthTokenProps {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  idToken: string | null;
  scope: string | null;
}

export class KakaoOAuthToken extends AggregateRoot<KakaoOAuthTokenProps, number> {
  private constructor(props: KakaoOAuthTokenProps, id: number) {
    super(props, id);
  }

  static create(props: KakaoOAuthTokenProps, id: number): Result<KakaoOAuthToken> {
    return Result.ok(new KakaoOAuthToken(props, id));
  }

  static createNew(props: KakaoOAuthTokenProps): Result<KakaoOAuthToken> {
    return this.create({ ...props }, 0);
  }

  get accessToken(): string {
    return this.props.accessToken;
  }

  get refreshToken(): string {
    return this.props.refreshToken;
  }

  get tokenType(): string {
    return this.props.tokenType;
  }

  get expiresIn(): number {
    return this.props.expiresIn;
  }

  get idToken(): string | null {
    return this.props.idToken;
  }

  get scope(): string | null {
    return this.props.scope;
  }
}
