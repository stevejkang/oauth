import { CoreResponse } from '../../../../../shared/core/application/CoreResponse';

export interface IssueGoogleAuthorizationUrlUseCaseResponse extends CoreResponse {
  url: string;
}
