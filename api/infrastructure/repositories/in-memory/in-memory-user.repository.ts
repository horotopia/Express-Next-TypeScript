import { User, UserRepositoryInterface, UserRole } from '../../../domain';

/**
 * In-Memory implementation of the UserRepository interface.
 * This is useful for testing and development.
 */
export class InMemoryUserRepository implements UserRepositoryInterface {
  private users: Map<string, User> = new Map();

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async findByRole(role: UserRole): Promise<User[]> {
    return Array.from(this.users.values()).filter(
      user => user.role === role
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = Array.from(this.users.values()).find(
      user => user.email === email
    );
    return found || null;
  }

  async findActive(): Promise<User[]> {
    return Array.from(this.users.values()).filter(
      user => user.isActive
    );
  }

  async findInactive(): Promise<User[]> {
    return Array.from(this.users.values()).filter(
      user => !user.isActive
    );
  }

  async save(user: User): Promise<User> {
    this.users.set(user.id, user);
    return user;
  }

  async delete(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  async findByNameContaining(name: string): Promise<User[]> {
    const lowerCaseName = name.toLowerCase();
    return Array.from(this.users.values()).filter(
      user => {
        return (
          user.firstName.toLowerCase().includes(lowerCaseName) ||
          user.lastName.toLowerCase().includes(lowerCaseName) ||
          user.fullName.toLowerCase().includes(lowerCaseName)
        );
      }
    );
  }

  async findByPhone(phone: string): Promise<User | null> {
    const found = Array.from(this.users.values()).find(
      user => user.phone === phone
    );
    return found || null;
  }
}
