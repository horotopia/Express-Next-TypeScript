import { UserModelInterface } from '../interfaces';
import { UserRole } from '../value-objects';
import { v4 as uuidv4 } from 'uuid';


export class User implements UserModelInterface {
  private readonly _id: string;
  private _firstName?: string;
  private _lastName?: string;
  private _email: string;
  private _password: string;
  private _phone?: string;
  private _role: UserRole;
  private _isActive: boolean;
  private _createdAt: Date;
  private _lastLoginAt?: Date | undefined;

  constructor(
    id = uuidv4(),
    firstName = '',
    lastName = '',
    email = '',
    password = '',
    phone = '',
    role = UserRole.USER,
    isActive = false,
    createdAt = new Date(),
    lastLoginAt = undefined,
  ) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._password = password;
    this._phone = phone;
    this._role = role;
    this._isActive = isActive || false;
    this._createdAt = createdAt || new Date();
    this._lastLoginAt = lastLoginAt;

    console.log("User email validator test: ",User.isValidEmail("test@example.com")); // Doit retourner true
    console.log("User password validator test: ", User.isValidPassword("Test123!mqud")); // Doit retourner true
  }

  // ----- getters -----

  get id(): string {
    return this._id;
  }

  get firstName(): string {
    return this._firstName || '';
  }

  get lastName(): string {
    return this._lastName || '';
  }

  get fullName(): string {
    return `${this._firstName} ${this._lastName}`;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get phone(): string {
    return this._phone || '';
  }

  get role(): UserRole {
    return this._role;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get lastLoginAt(): Date | undefined {
    return this._lastLoginAt;
  }

  // ----- Business methods -----

  activate(): void {
    this._isActive = true;
  }
  deactivate(): void {
    this._isActive = false;
  }
  updateProfile(firstName: string, lastName: string, phone: string): void {
    this._firstName = firstName;
    this._lastName = lastName;
    this._phone = phone;
  }
  changeRole(role: UserRole): void {
    this._role = role;
  }
  updateLastLogin(): void {
    this._lastLoginAt = new Date();
  }

  isUser(): boolean {
    return this._role === UserRole.USER;
  }
  isAdmin(): boolean {
    return this._role === UserRole.ADMIN;
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{12,}$/;
    return passwordRegex.test(password);
  }

  verifyIdentity(): void {
    // logic here
  }
  enableTwoFactorAuthentication(): void {
    // logic here
  }

  disableTwoFactorAuthentication(): void {
    // logic here
  }

}