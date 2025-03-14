import { TokenService } from '../../../../infrastructure';

export class LogoutUsecase {
  private tokenService: TokenService;

  constructor() {
    this.tokenService = new TokenService;
  }

  public async execute(token: string): Promise<void> {
    this.tokenService.invalidateToken(token);
  }
}