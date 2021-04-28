import { UserRole } from '../../../../domain/enum/user-role.enum';

export interface AuthorizeDtoOut {
  uuid: string;
  email: string;
  name: string;
  role: UserRole;
  exp: number;
}
