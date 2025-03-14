// import { InvalidCredentialsError } from '../../../errors/invalid-credentials.error';
// import { TokenService } from '../../../services/token.service';
// import { UserRepository } from '../../../repositories/user.repository';
// import { isValidEmail } from '../../../validators/email.validator';

// export class RecoverForgottenPasswordUsecase {
//   private userRepository: UserRepository;
//   private tokenService: TokenService;

//   constructor() {
//     this.userRepository = new UserRepository;
//     this.tokenService = new TokenService;
//   }

//   public async execute(email: string): Promise<{ token: string }> {
//     if (!isValidEmail(email)) {
//       throw new InvalidCredentialsError('Invalid email');
//     }
//     const user = await this.userRepository.findByEmail(email);
//     if (!user) {
//       throw new InvalidCredentialsError('Invalid email');
//     }

//     return this.tokenService.generateToken(user);
//   }
// }