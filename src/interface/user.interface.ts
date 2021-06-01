import { UserRoles } from 'src/enum/user-roles.enum';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  registrationDate: Date;
  role: UserRoles.admin;
  token?: string;
  salt?: string;
}
