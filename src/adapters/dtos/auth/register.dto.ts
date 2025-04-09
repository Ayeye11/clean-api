import { registerRules } from "@domain/rules";
import validateDto from "../validations/dto.validation";

export class RegisterDto {
  private constructor(
    public email: string,
    public username: string,
    public password: string,
  ) { }

  static create(data: Record<string, unknown>): [string?, RegisterDto?] {
    const { email, username, password } = data;

    const err = validateDto({ email, username, password }, registerRules);
    if (err) return [err];

    return [
      undefined,
      new RegisterDto(email as string, username as string, password as string),
    ];
  }
}
