import Database from "./database";
import {
	ApplicationModule,
	ControllerModule,
	MiddlewareModule,
	RepositoryModule,
} from "./modules";
import setupRoutes from "./routes";
import ServerHttp from "./server";

const cfg = {
	db: {
		host: "localhost",
		port: 3306,
		user: "root",
		password: "password",
		database: "clean_api_db",
	},
};

const main = async () => {
	try {
		// Configuration

		// Database
		const database = new Database(cfg.db);
		const db = await database.connect();
		// Repositories
		const repositories = new RepositoryModule(db);

		// Application
		const application = new ApplicationModule(repositories, "secretKey");

		// Middlewares
		const middlewares = new MiddlewareModule(application);

		// Controllers
		const controllers = new ControllerModule(application);

		// Routes
		const routes = setupRoutes(middlewares, controllers);

		// Server
		const server = new ServerHttp(routes);
		await server.run(3000, "localhost");

		// Close
		const gracefulClose = async (signal: NodeJS.Signals) => {
			console.log(` => Singal received: '${signal}'`);
			await database.close();
			await server.close();

			process.exit(0);
		};

		process.once("SIGINT", gracefulClose);
		process.once("SIGTERM", gracefulClose);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};
main();
