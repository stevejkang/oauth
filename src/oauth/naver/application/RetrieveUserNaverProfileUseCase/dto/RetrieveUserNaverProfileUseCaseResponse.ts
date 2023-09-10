import { CoreResponse } from '../../../../../shared/core/application/CoreResponse';
import { NaverProfile } from '../../../domain/NaverProfile';

export interface RetrieveUserNaverProfileUseCaseResponse extends CoreResponse {
  profile: NaverProfile | null;
}
