import { UserRole } from './enum/user-role.enum';

export interface User {
  uuid: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
}
