import { UserCreationModelInterface, UserModelInterface, UserRepositoryInterface, UserRole, UserUpdateModelInterface } from '../../../domain';
import { usersData } from './users-fake.data';
/**
 * In-Memory implementation of the UserRepository interface.
 * This is useful for testing and development.
 * - Find All Users
 * - Find User By Id
 * - Find User By Name Containing
 * - Find User By Email
 * - Find User By Phone
 * - Find User By Role
 * - Find Active Users
 * - Find Inactive Users
 * - Find Users By Created Date Range
 * - Find Users By Last Login Date Range
 * - Save User
 * - Update User
 * - Update User Password
 * - Update User Role
 * - Update User Active Status
 * - Update User Last Login At
 * - Delete User
 */
export class InMemoryUserRepository implements UserRepositoryInterface {
  private users: UserModelInterface[] = usersData;
  
  async findAll(): Promise<UserModelInterface[]> {
    console.log('InMemoryUserRepository - findAll');
    return this.users;
  }

  async findById(id: string): Promise<UserModelInterface | null> {
    console.log('InMemoryUserRepository - findById id:', id);
    return this.users.find(user => user.id === id) || null;
  }
  
  async findByNameContaining(name: string): Promise<UserModelInterface[]> {
    console.log('InMemoryUserRepository.findByNameContaining name:', name);
    const lowerCaseName = name.toLowerCase();
    return this.users.filter(
      user => {
        return (
          user.firstName?.toLowerCase().includes(lowerCaseName) || 
          user.lastName?.toLowerCase().includes(lowerCaseName)
        );
      }
    );
  }
  
  async findByEmail(email: string): Promise<UserModelInterface | null> {
    console.log('InMemoryUserRepository - findByEmail email:',
      email);
    return this.users.find(
      user => user.email === email
    ) || null;
  }
  
  async findByPhone(phone: string): Promise<UserModelInterface | null> {
    console.log('InMemoryUserRepository.findByPhone phone:',
      phone);
    const found = Array.from(this.users.values()).find(
      user => user.phone === phone
    );
    return found || null;
  }

  async findByRole(role: UserRole): Promise<UserModelInterface[]> {
    console.log('InMemoryUserRepository - findByRole role:', role);
    return this.users.filter(user => user.role === role);
  }

  async findActive(): Promise<UserModelInterface[]> {
    console.log('InMemoryUserRepository - findActive');
    return this.users.filter(
      user => user.isActive
    );
  }

  async findInactive(): Promise<UserModelInterface[]> {
    console.log('InMemoryUserRepository - findInactive');
    return this.users.filter(
      user => !user.isActive
    );
  }

  async findByCreatedDateRange(
    startDate: Date, 
    endDate: Date = new Date(Date.now())
  ): Promise<UserModelInterface[]> {
    console.log('InMemoryUserRepository - findByCreatedDateRange startDate:', startDate, 'endDate:', endDate);
    return this.users.filter(
      user => user.createdAt >= startDate && user.createdAt <= endDate
    );
  }

  async findByLastLoginDateRange(
    startDate: Date, 
    endDate: Date = new Date(Date.now())
  ): Promise<UserModelInterface[]> {
    console.log('InMemoryUserRepository - findByLastLoginDateRange startDate:', startDate, 'endDate:', endDate);
    return this.users.filter(
      user => user.lastLoginAt && user.lastLoginAt >= startDate && user.lastLoginAt <= endDate
    );
  }

  async save(user: UserCreationModelInterface): Promise<UserCreationModelInterface> {
    console.log('InMemoryUserRepository - save user:', user);
    this.users.push(user);
    return user;
  }

  async update(user: UserUpdateModelInterface): Promise<UserModelInterface | null> {  
    console.log('InMemoryUserRepository - update user:', user);
    if (!user.id) {
      throw new Error('User id is required for update');
    }
    let updatedUser: UserModelInterface | null = null;
    this.users = this.users.map(u => {
      if (u.id === user.id) {
        updatedUser = { ...u, ...user };
        return updatedUser;
      }
      return u;
    });
    return updatedUser;
  }

  async updatePassword(id: string, password: string): Promise<UserModelInterface | null> {
    console.log('InMemoryUserRepository - updatePassword id:', id, 'password:', password);
    let updatedUser: UserModelInterface | null = null;
    this.users = this.users.map(user => {
      if (user.id === id) {
        updatedUser = { ...user, password };
        return updatedUser;
      }
      return user;
    });
    return updatedUser;
  }

  async updateRole(id: string, role: UserRole): Promise<UserModelInterface | null> {
    console.log('InMemoryUserRepository - updateRole id:', id, 'role:', role);
    let updatedUser: UserModelInterface | null = null;
    this.users = this.users.map(user => {
      if (user.id === id) {
        updatedUser = { ...user, role };
        return updatedUser;
      }
      return user;
    });
    return updatedUser;
  }
  
  async updateActiveStatus(id: string): Promise<UserModelInterface | null> {
    console.log('InMemoryUserRepository - updateActiveStatus id:', id);
    let updatedUser: UserModelInterface | null = null;
    this.users = this.users.map(user => {
      if (user.id === id) {
        updatedUser = { ...user, isActive: !user.isActive };
        return updatedUser;
      }
      return user;
    });
    return updatedUser;
  }

  async updateLastLoginAt(id: string): Promise<UserModelInterface | null> {
    const currentDate = new Date();
    console.log('InMemoryUserRepository - updateLastLoginAt id:', id, 'lastLoginAt:', currentDate);
    let updatedUser: UserModelInterface | null = null;
    this.users = this.users.map(user => {
      if (user.id === id) {
        updatedUser = { ...user, lastLoginAt: currentDate };
        return updatedUser;
      }
      return user;
    });
    return updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    console.log('InMemoryUserRepository - delete id:', id);
    const originalLength = this.users.length;
    const user = this.users.find(user => user.id === id);
    if (!user) {
      return false;
    }
    this.users.splice(this.users.indexOf(user), 1);
    return this.users.length < originalLength;
  }
}
