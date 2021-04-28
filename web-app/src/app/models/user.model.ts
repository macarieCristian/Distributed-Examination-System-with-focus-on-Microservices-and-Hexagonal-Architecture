import {UserRole} from './enum/user-role.enum';

export interface User {
  name: string;
  email: string;
  password?: string;
  uuid?: string;
  exp?: number;
  role?: UserRole;
}
