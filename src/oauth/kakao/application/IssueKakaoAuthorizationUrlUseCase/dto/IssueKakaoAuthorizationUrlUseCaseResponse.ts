import { CoreResponse } from '../../../../../shared/core/application/CoreResponse';

export interface IssueKakaoAuthorizationUrlUseCaseResponse extends CoreResponse {
  url: string;
}
