import {Roles} from './roles';
export class User {
  id?: number;
  externalId?: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  email: string;
  type: string;
  roles: Roles[];
}
