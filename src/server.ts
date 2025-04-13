import { AuthenticateUseCase } from "@application/use-case";
import { UserIdentifierModel } from "@infrastructure/database/models";
import { UserRepositoryImpl } from "@infrastructure/database/repository";
import { RequestImpl, ResponseImpl } from "@infrastructure/http";
import { setupRoutes } from "@infrastructure/routes/setup.routes";
import {
	BcryptService,
	Database,
	JwtService,
	UuidService,
} from "@infrastructure/services";
import { AuthController } from "@interfaces/controllers";
import { Server } from "node:http";

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

		const server = new Server((sReq, sRes) => {
			const req = new RequestImpl(sReq);
			const res = new ResponseImpl(sRes);

			setupRoutes(req, res, controller);
		});

		server.listen(3000, () => console.log("server up"));
	} catch (err) {
		console.error(err);
	}
};
main();
