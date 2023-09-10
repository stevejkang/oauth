import { CoreResponse } from '../../../../../shared/core/application/CoreResponse';

export interface IssueKakaoAuthorizationTokenUseCaseResponse extends CoreResponse {
  token: string | null;
  error: string | null;
}
