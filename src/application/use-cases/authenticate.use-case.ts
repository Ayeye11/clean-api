import type {
	HashService,
	IdService,
	TokenService,
} from "@application/services";
import type { UserIdentifier } from "@domain/entities";
import { AppErr } from "@domain/errs";
import type { UserRepository } from "@domain/repositories";
import { Role } from "@domain/security/permissions";

export class AuthenticateUseCase {
	constructor(
		private readonly userRepo: UserRepository,
		private readonly idSvc: IdService,
		private readonly hashSvc: HashService,
		private readonly tokenSvc: TokenService,
	) {}

	async register(data: { email: string; username: string; password: string }) {
		try {
			// Check if exists
			const conflict = await this.userRepo.isAvailable(
				{ email: data.email, username: data.username },
				true,
			);
			if (conflict) {
				if (conflict === "email") throw AppErr.emailExists();
				if (conflict === "username") throw AppErr.usernameExists();
			}

			// Setup user
			const user: UserIdentifier = {
				id: this.idSvc.create(),
				roleId: Role.DEFAULT,
				email: data.email,
				username: data.username,
				password: await this.hashSvc.hash(data.password),
			};

			// Try to save
			await this.userRepo.createIdentifier(user);
		} catch (err) {
			throw err instanceof AppErr ? err : AppErr.unknown(err);
		}
	}

	async login(data: { identifier: string; password: string }) {
		try {
			// Get user
			const u = await this.userRepo.findOne({
				email: data.identifier,
				username: data.identifier,
			});

			// Compare credentials
			if (!u || !(await this.hashSvc.compare(data.password, u.password))) {
				throw AppErr.invalidAuth();
			}

			// Create token
			return await this.tokenSvc.create(u);
		} catch (err) {
			throw err instanceof AppErr ? err : AppErr.unknown(err);
		}
	}
}
