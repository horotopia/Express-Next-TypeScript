import { UserRepositoryInterface, UserModelInterface, UserRole, User } from '../../../domain';
import { UserModel } from '.';
import { Op } from 'sequelize';

/**
 * Sequelize implementation of the UserRepository interface.
 * This is the repository for the User entity.
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

export class UserRepository implements UserRepositoryInterface {

  async findAll(): Promise<User[]> {
    const userModels = await UserModel.findAll();
    return userModels.map(this.toDomain);
  }
  async findById(id: string): Promise<User | null> {
    const userModel = await UserModel.findByPk(id);
    return userModel ? this.toDomain(userModel) : null;
  }
  
  async findByNameContaining(name: string): Promise<User[]> {
    const userModels = await UserModel.findAll({
      where: {
        firstName: { [Op.like]: `%${name}%` },
      },
    });
    return userModels.map(this.toDomain);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userModel = await UserModel.findOne({ where: { email } });
    return userModel ? this.toDomain(userModel) : null;
  }

  async findByPhone(phone: string): Promise<User | null> {
    const userModel = await UserModel.findOne({ where: { phone } });
    return userModel ? this.toDomain(userModel) : null;
  }

  async findByRole(role: UserRole): Promise<User[]> {
    const userModels = await UserModel.findAll({ where: { role } });
    return userModels.map(this.toDomain);
  }

  async findActive(): Promise<User[]> {
    const userModels = await UserModel.findAll({ where: { isActive: true } });
    return userModels.map(this.toDomain);
  }

  async findInactive(): Promise<User[]> {
    const userModels = await UserModel.findAll({ where: { isActive: false } });
    return userModels.map(this.toDomain);
  }

  async findByCreatedDateRange(startDate: Date, endDate: Date): Promise<User[]> {
    const userModels = await UserModel.findAll({ where: { createdAt: { [Op.between]: [startDate, endDate] } } });
    return userModels.map(this.toDomain);
  }

  async findByLastLoginDateRange(startDate: Date, endDate: Date): Promise<User[]> {
    const userModels = await UserModel.findAll({ where: { lastLoginAt: { [Op.between]: [startDate, endDate] } } });
    return userModels.map(this.toDomain);
  }

  async save(user: User): Promise<User> {
    const userModel = await UserModel.upsert(this.toPersistence(user));
    return this.toDomain(userModel[0]);
  }

  async update(user: User): Promise<User | null> {
    const [affectedCount] = await UserModel.update(this.toPersistence(user), { where: { id: user.id } });
    if (affectedCount === 0) return null;
    const updatedUser = await UserModel.findByPk(user.id);
    return updatedUser ? this.toDomain(updatedUser) : null;
  }

  async updatePassword(id: string, password: string): Promise<boolean> {
    const updatedCount = await UserModel.update({ password }, { where: { id } });
    return updatedCount !== null;
  }

  async updateRole(id: string, role: UserRole): Promise<boolean> {
    const updatedCount = await UserModel.update({ role }, { where: { id } });
    return updatedCount !== null;
  }

  async updateActiveStatus(id: string, isActive: boolean): Promise<boolean> {
    const updatedCount = await UserModel.update({ isActive }, { where: { id } });
    return updatedCount !== null;
  }

  async updateLastLoginAt(id: string, lastLoginAt: Date): Promise<boolean> {
    const updatedCount = await UserModel.update({ lastLoginAt }, { where: { id } });
    return updatedCount !== null;
  }

  async delete(id: string): Promise<boolean> {
    const deletedCount = await UserModel.destroy({ where: { id } });
    return deletedCount > 0;
  }

  // Méthodes de mapping entre Sequelize et l'entité domaine

  private toDomain(userModel: UserModelInterface): User {
    return new User(
      userModel.id,
      userModel.firstName || '',
      userModel.lastName || '',
      userModel.email,
      userModel.password,
      userModel.phone || '',
      userModel.role,
      userModel.isActive,
      userModel.createdAt,
      userModel.lastLoginAt || undefined,
    );
  }

  private toPersistence(user: User): Omit<UserModelInterface, 'id'> & { id: string } {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
    };
  }
}
