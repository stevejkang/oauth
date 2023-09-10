import { AggregateRoot } from '../../../shared/core/domain/AggregateRoot';
import { Result } from '../../../shared/core/domain/Result';

interface KakaoProfileProps {
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

export class KakaoProfile extends AggregateRoot<KakaoProfileProps, number> {
  private constructor(props: KakaoProfileProps, id: number) {
    super(props, id);
  }

  static create(props: KakaoProfileProps, id: number): Result<KakaoProfile> {
    return Result.ok(new KakaoProfile(props, id));
  }

  static createNew(props: KakaoProfileProps): Result<KakaoProfile> {
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
