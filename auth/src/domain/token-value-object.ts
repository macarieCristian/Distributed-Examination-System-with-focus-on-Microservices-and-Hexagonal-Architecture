import { UserRole } from './enum/user-role.enum';

export class TokenValueObject {
  constructor(
    public sub: string,
    public email: string,
    public name: string,
    public role: UserRole,
    public iat: number,
    public exp: number
  ) {}
}
