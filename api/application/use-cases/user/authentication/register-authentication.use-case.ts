import { UserExistsError } from '../../../errors';
import { TokenService, InMemoryUserRepository, EncryptionService } from '../../../../infrastructure';
import { EncryptionServiceInterface, TokenServiceInterface, UserRepositoryInterface } from '../../../../domain';
import { User } from '../../../../domain/entities/user.entity';

export class RegisterUsecase {
  private userRepository: UserRepositoryInterface;
  private tokenService: TokenServiceInterface;
  private EncryptService: EncryptionServiceInterface;

  constructor() {
    this.userRepository = new InMemoryUserRepository;
    this.tokenService = new TokenService;
    this.EncryptService = new EncryptionService;
  }
  public async execute(email: string, password: string): Promise<{ token: string } | UserExistsError> {
    if (await this.userRepository.findByEmail(email)) {
      return new UserExistsError('Email already in use');
    }

    password = await this.EncryptService.hashPassword(password);
    const user = new User(email, password);
    await this.userRepository.save(user);
    
    return { token: this.tokenService.generateToken(user) };
  }
}