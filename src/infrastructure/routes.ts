import type { AuthController } from "@interfaces/controllers";
import type { IncomingMessage, ServerResponse } from "node:http";
import { RequestImpl, ResponseImpl, Router } from "./http";

export type Routes = (req: IncomingMessage, res: ServerResponse) => void;

export const setupRoutes = (con: AuthController): Routes => {
	return (req, res) => {
		const router = new Router(new RequestImpl(req), new ResponseImpl(res));

		// Main path
		const api = router.subRouter("/api");

		// ---- AUTH
		const auth = api.subRouter("/auth");
		if (auth.post("/register", con.register.bind(con))) return;
		if (auth.post("/login", con.login.bind(con))) return;

		// Not found
		router.use((_req, res) => {
			res.sendError(404, "Not found");
		});
	};
};
