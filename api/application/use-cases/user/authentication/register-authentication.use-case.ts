import { UserExistsError } from '../../../errors';
import { TokenService, InMemoryUserRepository } from '../../../../infrastructure';
import { TokenServiceInterface, UserRepositoryInterface } from '../../../../domain';
import { User } from '../../../../domain/entities/user.entity';

export class RegisterUsecase {
  private userRepository: UserRepositoryInterface;
  private tokenService: TokenServiceInterface;

  constructor() {
    this.userRepository = new InMemoryUserRepository;
    this.tokenService = new TokenService;
  }
  public async execute(email: string, password: string): Promise<{ token: string }> {
    if (await this.userRepository.findByEmail(email)) {
      throw new UserExistsError('Email already in use');
    }
    
    const user = new User(email, password);
    await this.userRepository.save(user);
    
    return { token: this.tokenService.generateToken(user) };
  }
}