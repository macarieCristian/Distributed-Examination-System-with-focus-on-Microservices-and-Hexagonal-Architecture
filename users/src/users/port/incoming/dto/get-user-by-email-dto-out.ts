import { UserRole } from '../../../../domain/enum/user-role.enum';

export interface GetUserByEmailDtoOut {
  uuid: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
}
