import { AggregateRoot } from '../../../shared/core/domain/AggregateRoot';
import { Result } from '../../../shared/core/domain/Result';

interface NaverOAuthTokenProps {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export class NaverOAuthToken extends AggregateRoot<NaverOAuthTokenProps, number> {
  private constructor(props: NaverOAuthTokenProps, id: number) {
    super(props, id);
  }

  static create(props: NaverOAuthTokenProps, id: number): Result<NaverOAuthToken> {
    return Result.ok(new NaverOAuthToken(props, id));
  }

  static createNew(props: NaverOAuthTokenProps): Result<NaverOAuthToken> {
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
}
