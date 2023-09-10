import { AggregateRoot } from '../../../shared/core/domain/AggregateRoot';
import { Result } from '../../../shared/core/domain/Result';

interface NaverProfileProps {
  uid: string;
  nickname: string;
  name: string;
  email: string;
  gender: string;
  age: string;
  birthday: string;
  profileImageUrl: string;
  phoneNumber: string;
}

export class NaverProfile extends AggregateRoot<NaverProfileProps, number> {
  private constructor(props: NaverProfileProps, id: number) {
    super(props, id);
  }

  static create(props: NaverProfileProps, id: number): Result<NaverProfile> {
    return Result.ok(new NaverProfile(props, id));
  }

  static createNew(props: NaverProfileProps): Result<NaverProfile> {
    return this.create({ ...props }, 0);
  }

  get uid(): string {
    return this.props.uid;
  }

  get nickname(): string {
    return this.props.nickname;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get gender(): string {
    return this.props.gender;
  }

  get age(): string {
    return this.props.age;
  }

  get birthday(): string {
    return this.props.birthday;
  }

  get profileImageUrl(): string {
    return this.props.profileImageUrl;
  }

  get phoneNumber(): string {
    return this.props.phoneNumber;
  }
}
