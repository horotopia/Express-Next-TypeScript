import { sign, verify } from "jsonwebtoken";
import { InMemoryUserRepository, Logger } from "../../infrastructure";
import { TokenServiceInterface } from "../../domain";
import { User, UserRepositoryInterface } from "../../domain";
import { ENV } from "../../env";


export class TokenService implements TokenServiceInterface {
  private secret: string;
  private userRepository: UserRepositoryInterface;

  constructor() {
    this.secret = ENV.JWT_SECRET || "";
    if (this.secret === "") {
      Logger.get().error(new Error("JWT_SECRET is not defined"));
      Logger.get().error(new Error(`JWT_SECRET: ${this.secret}`));
      throw new Error("JWT_SECRET is not defined");
    }
    this.userRepository = new InMemoryUserRepository();
  }

  generateToken(user: User): string {
    return sign(
      { id: user.id, email: user.email, role: user.role },
      this.secret,
      { expiresIn: "1h" },
    );
  }

  async verifyToken(token: string): Promise<User | null> {
    try {
      const decoded = verify(token, this.secret) as { user: User, tokenVersion: number };

      const user = await this.userRepository.findById(decoded.user.id);
      
      // TODO: Check if token time is valid
      if (!user) {
        throw new Error("Token invalid or expired");
      }

      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  invalidateToken(token: string): string {
    return sign(
      { token },
      this.secret,
      { expiresIn: 0 },
    )
  }
}