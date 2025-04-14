import type { AuthController } from "@interfaces/controllers";
import type { IncomingMessage, ServerResponse } from "node:http";
import { RequestImpl, ResponseImpl, Router } from "./http";

export type Routes = (req: IncomingMessage, res: ServerResponse) => void;

export const setupRoutes = (con: AuthController): Routes => {
	return (sReq, sRes) => {
		const req = new RequestImpl(sReq);
		const res = new ResponseImpl(sRes);
		const router = new Router(req, res);

		// Main path
		const api = router.subRouter("/api");

		// ---- AUTH
		const auth = api.subRouter("/auth");
		auth.post("/register", con.register.bind(con));
		auth.post("/login", con.login.bind(con));

		// Run Routes
		const handled = router.handleRequest();

		if (!handled) {
			res.sendError(404, "Not found");
		}
	};
};
