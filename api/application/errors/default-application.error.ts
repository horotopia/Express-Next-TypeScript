export class DefaultApplicationError
  extends Error
{
  public statusCode = 500;
  public messages: string[] = [];

  constructor(message?: string) {
    super(message);
    this.message = message || this.name;
    this.name = "DefaultApplicationError";
    this.messages.push(this.message);
  }
}