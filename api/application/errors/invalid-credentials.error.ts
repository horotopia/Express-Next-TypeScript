import { DefaultApplicationError } from '.';

export class InvalidCredentialsError
  extends DefaultApplicationError
{
  public statusCode = 401;
  public messages: string[] = [];

  constructor(message?: string) {
    super(message);
    this.message = message || 'Invalid credentials';
    this.name = "InvalidCredentialsError";
    this.messages.push(this.message);
  }
}