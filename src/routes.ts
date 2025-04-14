import { RequestImpl, ResponseImpl, Router } from "@infrastructure/http";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { ControllerModule } from "./modules";

export type Routes = (req: IncomingMessage, res: ServerResponse) => void;

const setupRoutes = (controllers: ControllerModule): Routes => {
	return (sReq, sRes) => {
		const req = new RequestImpl(sReq);
		const res = new ResponseImpl(sRes);
		const router = new Router(req, res);

		// Main path
		const api = router.subRouter("/api");

		// ---- AUTH
		const auth = api.subRouter("/auth");
		const authController = controllers.getAuth();
		auth.post("/register", authController.register.bind(authController));
		auth.post("/login", authController.login.bind(authController));

		// Run Routes
		const handled = router.handleRequest();

		if (!handled) {
			res.sendError(404, "Not found");
		}
	};
};

export default setupRoutes;
