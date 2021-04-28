import { UserRole } from '../../../../domain/enum/user-role.enum';

export interface AuthorizeDtoIn {
  token: string;
  acceptedRoles: UserRole[];
}
