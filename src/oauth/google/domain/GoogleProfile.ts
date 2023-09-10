import { AggregateRoot } from '../../../shared/core/domain/AggregateRoot';
import { Result } from '../../../shared/core/domain/Result';

interface GoogleProfileProps {
  uid: string;
  email: string;
  profileImageUrl: string;
}

export class GoogleProfile extends AggregateRoot<GoogleProfileProps, number> {
  private constructor(props: GoogleProfileProps, id: number) {
    super(props, id);
  }

  static create(props: GoogleProfileProps, id: number): Result<GoogleProfile> {
    return Result.ok(new GoogleProfile(props, id));
  }

  static createNew(props: GoogleProfileProps): Result<GoogleProfile> {
    return this.create({ ...props }, 0);
  }

  get uid(): string {
    return this.props.uid;
  }

  get email(): string {
    return this.props.email;
  }

  get profileImageUrl(): string {
    return this.props.profileImageUrl;
  }
}
