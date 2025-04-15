import { AuthController } from "@interfaces/controllers";
import type { ApplicationModule } from "./application.module";

export class ControllerModule {
	private static auth?: AuthController;

	constructor(private readonly app: ApplicationModule) {}

	getAuth() {
		if (!ControllerModule.auth) {
			ControllerModule.auth = new AuthController(
				this.app.getAuthenticationUseCase(),
			);
		}

		return ControllerModule.auth;
	}
}
