import { CoreResponse } from '../../../../../shared/core/application/CoreResponse';
import { KakaoProfile } from '../../../domain/KakaoProfile';

export interface RetrieveUserKakaoProfileUseCaseResponse extends CoreResponse {
  profile: KakaoProfile | null;
}
