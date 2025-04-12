import { loginRules } from "@domain/security/rules";
import { objectValidation } from "@interfaces/validations";

export class LoginDto {
	private constructor(
		public identifier: string,
		public password: string,
	) {}

	static create(data: Record<string, unknown>): [string?, LoginDto?] {
		const { identifier, password } = data;

		const err = objectValidation({ identifier, password }, loginRules, true);
		if (err) return [err];

		return [undefined, new LoginDto(identifier as string, password as string)];
	}
}
