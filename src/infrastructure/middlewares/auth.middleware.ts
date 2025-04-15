import type { AuthorizationUseCase } from "@application/use-cases/authorization.use-case";
import type { Action, Category } from "@domain/security/permissions";
import type { Controller } from "@infrastructure/http";

export class AuthMiddlewares {
	constructor(private readonly authorizeUseCase: AuthorizationUseCase) {}

	authRequired(): Controller {
		return async (req, res, next) => {
			try {
				const token = req.headerToken();
				const payload = await this.authorizeUseCase.authRequired(token);
				req.setUser(payload);

				next();
			} catch (err) {
				res.sendThrow(err);
			}
		};
	}

	permRequired(category: Category, action: Action): Controller {
		return async (req, res, next) => {
			try {
				const role = req.ctx.user;
				this.authorizeUseCase.checkAccess(role, category, action);

				next();
			} catch (err) {
				res.sendThrow(err);
			}
		};
	}
}
