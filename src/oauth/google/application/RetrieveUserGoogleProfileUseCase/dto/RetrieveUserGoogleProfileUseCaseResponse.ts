import { CoreResponse } from '../../../../../shared/core/application/CoreResponse';
import { GoogleProfile } from '../../../domain/GoogleProfile';

export interface RetrieveUserGoogleProfileUseCaseResponse extends CoreResponse {
  profile: GoogleProfile | null;
}
