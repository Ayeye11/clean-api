import { registerRules } from "@domain/security/rules";
import { objectValidation } from "@interfaces/validations";

export class RegisterDto {
	private constructor(
		public email: string,
		public username: string,
		public password: string,
	) {}

	static create(data: Record<string, unknown>): [string?, RegisterDto?] {
		const { email, username, password } = data;

		// Validation
		const err = objectValidation(
			{ email, username, password },
			registerRules,
			true,
		);
		if (err) return [err];

		// Create DTO
		return [
			undefined,
			new RegisterDto(email as string, username as string, password as string),
		];
	}
}
