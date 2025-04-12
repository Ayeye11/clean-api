import express from "express";
import Router from "@infrastructure/routes/setup.routes";
import { AuthController } from "@interfaces/controllers";
import { AuthenticateUseCase } from "@application/use-case";
import { UserRepositoryImpl } from "@infrastructure/database/repository";
import {
	BcryptService,
	Database,
	JwtService,
	UuidService,
} from "@infrastructure/services";
import { UserIdentifierModel } from "@infrastructure/database/models";

const main = async () => {
	try {
		const app = express();
		app.use(express.json());

		const db = Database.getInstance();
		await db.initialize();

		const repo = new UserRepositoryImpl(db.getRepository(UserIdentifierModel));
		const idSvc = new UuidService();
		const hashSvc = new BcryptService();
		const tokenSvc = new JwtService("secretKey");

		const useCase = new AuthenticateUseCase(repo, idSvc, hashSvc, tokenSvc);

		const controller = new AuthController(useCase);

		const rout = new Router(app, controller);
		rout.setup();
		app.listen(3000, () => console.log("server up"));
	} catch (err) {
		console.error(err);
	}
};
main();
