import { UserRole } from '../../../../../domain/enum/user-role.enum';

export interface AuthorizeRemoteDtoIn {
  uuid: string;
  email: string;
  name: string;
  role: UserRole;
  exp: number;
}
