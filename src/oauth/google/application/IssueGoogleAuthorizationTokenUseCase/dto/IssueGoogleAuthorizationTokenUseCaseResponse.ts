import { CoreResponse } from '../../../../../shared/core/application/CoreResponse';

export interface IssueGoogleAuthorizationTokenUseCaseResponse extends CoreResponse {
  token: string | null;
  error: string | null;
}
