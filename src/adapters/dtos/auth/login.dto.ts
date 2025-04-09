import { loginRules } from "@domain/rules";
import validateDto from "../validations/dto.validation";

export class LoginDto {
  private constructor(
    public identifier: string,
    public password: string,
  ) { }

  static create(data: Record<string, unknown>): [string?, LoginDto?] {
    const { identifier, password } = data;

    const err = validateDto({ identifier, password }, loginRules);
    if (err) return [err];

    return [undefined, new LoginDto(identifier as string, password as string)];
  }
}
