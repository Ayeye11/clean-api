import { loadConfiguration, loadEnvironment } from "./config";
import Database from "./database";
import {
  ApplicationModule,
  ControllerModule,
  MiddlewareModule,
  RepositoryModule,
} from "./modules";
import setupRoutes from "./routes";
import ServerHttp from "./server";

const main = async () => {
  try {
    // Configuration
    const env = loadEnvironment();
    const cfg = loadConfiguration(env);

    // Database
    const database = new Database(cfg.database);
    const db = await database.connect();

    // Modules
    const repositories = new RepositoryModule(db);
    const application = new ApplicationModule(repositories, "secretKey");
    const middlewares = new MiddlewareModule(application);
    const controllers = new ControllerModule(application);

    // Routes
    const routes = setupRoutes(middlewares, controllers);

    // Server
    const server = new ServerHttp(routes);
    await server.run(cfg.server.port, cfg.server.host);

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
