import { Model } from 'sequelize';
import { UserRole } from '../../../domain';
import { UserModelInterface, UserCreationModelInterface } from '../../../domain/interfaces/models/user-model.interface';


export class UserModel extends Model<UserModelInterface, UserCreationModelInterface> implements UserModelInterface {
  id!: string;
  firstName?: string;
  lastName?: string;
  email!: string;
  password!: string;
  phone?: string;
  role!: UserRole;
  isActive!: boolean;
  createdAt!: Date;
  lastLoginAt?: Date | undefined;
}