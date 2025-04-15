import { AuthMiddlewares } from "@infrastructure/middlewares";
import type { ApplicationModule } from "./application.module";

export class MiddlewareModule {
	private static auth?: AuthMiddlewares;

	constructor(private readonly app: ApplicationModule) {}

	getAuth() {
		if (!MiddlewareModule.auth) {
			MiddlewareModule.auth = new AuthMiddlewares(
				this.app.getAuthorizationUseCase(),
			);
		}

		return MiddlewareModule.auth;
	}
}
