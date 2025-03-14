import { InvalidCredentialsError } from '../../../';
import { InMemoryUserRepository, TokenService, EncryptionService } from '../../../../infrastructure';
import { UserRepositoryInterface, EncryptionServiceInterface, TokenServiceInterface } from '../../../../domain';

export class LoginUsecase {
  private userRepository: UserRepositoryInterface;
  private encryptionService: EncryptionServiceInterface;
  private tokenService: TokenServiceInterface;

  constructor() {
    this.userRepository = new InMemoryUserRepository();
    this.encryptionService = new EncryptionService();
    this.tokenService = new TokenService();
  }
  
  public async execute(email: string, password: string): Promise<string> {

    const user = await this.userRepository.findByEmail(email);
    if (!user || !this.encryptionService.comparePassword(user.password, password)) {
      throw new InvalidCredentialsError('Invalid email or password');
    }
    
    return this.tokenService.generateToken(user);
  }
}