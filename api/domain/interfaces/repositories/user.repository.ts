import { User, UserRole } from '../';

/**
 * UserRepository Interface
 * 
 * Defines the contract for user data access operations.
 * This interface will be implemented by different adapters (in-memory, SQL, etc.)
 */
export interface UserRepositoryInterface {
  /**
   * Find a user by their ID
   * @param id The user ID
   * @returns A Promise that resolves to the user or null if not found
   */
  findById(id: string): Promise<User | null>;
  
  /**
   * Find all users
   * @returns A Promise that resolves to an array of users
   */
  findAll(): Promise<User[]>;
  
  /**
   * Find users by role
   * @param role The user role
   * @returns A Promise that resolves to an array of users
   */
  findByRole(role: UserRole): Promise<User[]>;
  
  /**
   * Find a user by email
   * @param email The user email
   * @returns A Promise that resolves to the user or null if not found
   */
  findByEmail(email: string): Promise<User | null>;
  
  /**
   * Find active users
   * @returns A Promise that resolves to an array of active users
   */
  findActive(): Promise<User[]>;
  
  /**
   * Find inactive users
   * @returns A Promise that resolves to an array of inactive users
   */
  findInactive(): Promise<User[]>;
  
  /**
   * Save a user (create or update)
   * @param user The user to save
   * @returns A Promise that resolves to the saved user
   */
  save(user: User): Promise<User>;
  
  /**
   * Delete a user by their ID
   * @param id The user ID
   * @returns A Promise that resolves to true if the user was deleted, false otherwise
   */
  delete(id: string): Promise<boolean>;
  
  /**
   * Find users by name (partial match on first or last name)
   * @param name The name to search for
   * @returns A Promise that resolves to an array of users
   */
  findByNameContaining(name: string): Promise<User[]>;
  
  /**
   * Find users by phone number
   * @param phone The phone number
   * @returns A Promise that resolves to the user or null if not found
   */
  findByPhone(phone: string): Promise<User | null>;
}
