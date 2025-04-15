import type {
	HashService,
	IdService,
	TokenService,
} from "@application/services";
import { AuthenticateUseCase } from "@application/use-cases";
import {
	BcryptService,
	JwtService,
	UuidService,
} from "@infrastructure/services";
import type { RepositoryModule } from "./repositories.module";
import { AuthorizationUseCase } from "@application/use-cases/authorization.use-case";

abstract class ServiceModule {
	constructor(private readonly secretKey: string) {}

	private static hash?: HashService;
	private static id?: IdService;
	private static token?: TokenService;

	protected getHash() {
		if (!ServiceModule.hash) {
			ServiceModule.hash = new BcryptService();
		}

		return ServiceModule.hash;
	}

	protected getId() {
		if (!ServiceModule.id) {
			ServiceModule.id = new UuidService();
		}

		return ServiceModule.id;
	}

	protected getToken() {
		if (!ServiceModule.token) {
			ServiceModule.token = new JwtService(this.secretKey);
		}

		return ServiceModule.token;
	}
}

export class ApplicationModule extends ServiceModule {
	private repositories: RepositoryModule;
	private static authenticationUseCase?: AuthenticateUseCase;
	private static authorizationUseCase?: AuthorizationUseCase;

	constructor(repositories: RepositoryModule, secretKey: string) {
		super(secretKey);
		this.repositories = repositories;
	}

	getAuthenticationUseCase() {
		if (!ApplicationModule.authenticationUseCase) {
			ApplicationModule.authenticationUseCase = new AuthenticateUseCase(
				this.repositories.getUser(),
				this.getId(),
				this.getHash(),
				this.getToken(),
			);
		}

		return ApplicationModule.authenticationUseCase;
	}

	getAuthorizationUseCase() {
		if (!ApplicationModule.authorizationUseCase) {
			ApplicationModule.authorizationUseCase = new AuthorizationUseCase(
				this.getToken(),
			);
		}

		return ApplicationModule.authorizationUseCase;
	}
}
