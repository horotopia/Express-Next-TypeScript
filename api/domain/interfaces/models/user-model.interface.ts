import { UserRole } from '../../';

export interface UserModelInterface {
  id: string; // never change
  firstName?: string;
  lastName?: string;
  email: string;
  password: string; // special rules
  phone?: string;
  role: UserRole; //special rules
  isActive: boolean; //special rules
  createdAt: Date; // never change
  lastLoginAt?: Date; // special rules
}

export interface UserCreationModelInterface extends Omit<UserModelInterface, 'firstName' | 'lastName' | 'phone' | 'lastLoginAt'> {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
}

export interface UserUpdateModelInterface extends Partial<Omit<UserModelInterface, 'id' | 'firstName' | 'lastName' | 'email' | 'phone'>> {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}