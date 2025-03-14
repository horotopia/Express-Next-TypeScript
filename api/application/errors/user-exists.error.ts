import { DefaultApplicationError } from ".";

export class UserExistsError extends DefaultApplicationError {
  public statusCode = 409;
  public messages: string[] = [];

  constructor(message?: string) {
    super(message);
    this.message = message || 'User already exists';
    this.name = "UserExistsError";
    this.messages.push(this.message);
  }
}