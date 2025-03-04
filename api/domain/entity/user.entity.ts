export class UserEntity {
  constructor(
    private readonly _id: string,
    private _firstName: string,
    private _lastName: string,
    private _email: string,
    private _phone: string,
    private _role: UserRole,
//  private 
    private _isActive: boolean,
    private _createdAt: Date,
    private _lastLoginAt: Date | null,
  ) {}

  // getters
  get id(): string {
    return this._id;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get fullName(): string {
    return `${this._firstName} ${this._lastName}`;
  }

  get email(): string {
    return this._email;
  }

  get phone(): string {
    return this._phone;
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

  get lastLoginAt(): Date | null {
    return this._lastLoginAt;
  }

  // Business methods

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

  isCustomer(): boolean {
    return this._role === UserRole.CUSTOMER;
  }
  isAdmin(): boolean {
    return this._role === UserRole.ADMIN;
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