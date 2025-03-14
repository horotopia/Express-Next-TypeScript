import { User } from "../entities";

export interface TokenServiceInterface {
  /**
   * Generate a token for a user
   * @param user The user
   * @returns The token
   */
  generateToken(user: User): string;
  
  /**
   * Verify a token and return the user
   * @param token The token
   * @returns A Promise that resolves to the user or null if the token is invalid
   */
  verifyToken(token: string): Promise<User | null>;

  /**
   * Invalidate a token
   * @param token The token
   * @returns The invalidated token
   */
  invalidateToken(token: string): string;
}