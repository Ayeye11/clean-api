import { AuthenticateUseCase } from "@application/use-cases";
import { UserIdentifierModel } from "@infrastructure/database/models";
import { UserRepositoryImpl } from "@infrastructure/database/repository";
import { setupRoutes } from "@infrastructure/routes";
import ServerHttp from "@infrastructure/http-server";
import {
	BcryptService,
	Database,
	JwtService,
	UuidService,
} from "@infrastructure/services";
import { AuthController } from "@interfaces/controllers";

const main = async () => {
	try {
		const db = Database.getInstance();
		await db.initialize();

		const repo = new UserRepositoryImpl(db.getRepository(UserIdentifierModel));
		const idSvc = new UuidService();
		const hashSvc = new BcryptService();
		const tokenSvc = new JwtService("secretKey");

		const useCase = new AuthenticateUseCase(repo, idSvc, hashSvc, tokenSvc);

		const controller = new AuthController(useCase);
		const routes = setupRoutes(controller);

		const server = new ServerHttp(routes);
		server.run(3000, "localhost");
	} catch (err) {
		console.error(err);
	}
};
main();
