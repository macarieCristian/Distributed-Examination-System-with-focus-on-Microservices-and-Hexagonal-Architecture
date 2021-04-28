import { UserRole } from './enum/user-role.enum';

export class User {
  uuid: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
}
