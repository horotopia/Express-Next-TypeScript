// import { UserNotFoundError, InvalidCredentialsError } from '../../../../domain';
// import { UserRepository } from '../../../../domain';
// import { TokenService } from '../../../../domain';
// import { isValidEmail, isValidPassword } from '../../../../domain';

// export class ChangePasswordAccountUsecase {
//   private readonly userRepository: UserRepository;
//   private readonly tokenService: TokenService;

//   constructor() {
//     this.userRepository = new UserRepository();
//     this.tokenService = new TokenService();
//   }

//   async execute(email: string, password: string): Promise<void> {
//     if (!isValidEmail(email) || !isValidPassword(password)) {
//       throw new InvalidCredentialsError('Invalid email or password');
//     }
//     const user = await this.userRepository.findByEmail(email);
//     if (!user) {
//       throw new UserNotFoundError();
//     }

//     const passwordHash = await this.userRepository.hashPassword(password);

//     user.password = passwordHash;

//     await this.userRepository.save(user);
//   }
// }