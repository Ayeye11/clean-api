import { RequestImpl, ResponseImpl, Router } from "@infrastructure/http";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { ControllerModule, MiddlewareModule } from "./modules";
import { Action, Category } from "@domain/security/permissions";

export type Routes = (req: IncomingMessage, res: ServerResponse) => void;

const setupRoutes = (
	middlewares: MiddlewareModule,
	controllers: ControllerModule,
): Routes => {
	return (sReq, sRes) => {
		const req = new RequestImpl(sReq);
		const res = new ResponseImpl(sRes);

		// Main
		const api = new Router(req, res, "/api");

		// ---- AUTH
		const auth = api.subRouter("/auth");
		const authControllers = controllers.getAuth();
		auth.post("/register", authControllers.register.bind(authControllers));
		auth.post("/login", authControllers.login.bind(authControllers));

		// ---- PRODUCTS
		const authMiddlewares = middlewares.getAuth();
		const products = api.subRouter("/products", authMiddlewares.authRequired());
		products.get("/test", (_req, res) => {
			res.sendSuccess(200, "all ok in test");
		});
		products.get(
			"/test2",
			authMiddlewares.permRequired(Category.PRODUCTS, Action.VIEW),
			(_req, res) => {
				res.sendSuccess(200, "all ok in test2");
			},
		);

		// Run Routes
		const handled = api.handleRequest();

		if (!handled) {
			res.sendError(404, "Not found");
		}
	};
};

export default setupRoutes;
