import { CoreResponse } from '../../../../../shared/core/application/CoreResponse';

export interface IssueNaverAuthorizationTokenUseCaseResponse extends CoreResponse {
  token: string | null;
  error: string | null;
}
