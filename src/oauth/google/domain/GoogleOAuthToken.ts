import { AggregateRoot } from '../../../shared/core/domain/AggregateRoot';
import { Result } from '../../../shared/core/domain/Result';

interface GoogleOAuthTokenProps {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  idToken: string;
  scope: string;
}

export class GoogleOAuthToken extends AggregateRoot<GoogleOAuthTokenProps, number> {
  private constructor(props: GoogleOAuthTokenProps, id: number) {
    super(props, id);
  }

  static create(props: GoogleOAuthTokenProps, id: number): Result<GoogleOAuthToken> {
    return Result.ok(new GoogleOAuthToken(props, id));
  }

  static createNew(props: GoogleOAuthTokenProps): Result<GoogleOAuthToken> {
    return this.create({ ...props }, 0);
  }

  get accessToken(): string {
    return this.props.accessToken;
  }

  get tokenType(): string {
    return this.props.tokenType;
  }

  get expiresIn(): number {
    return this.props.expiresIn;
  }

  get idToken(): string {
    return this.props.idToken;
  }

  get scope(): string {
    return this.props.scope;
  }
}
