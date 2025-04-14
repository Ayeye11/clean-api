import type { Request, Response } from "@interfaces/http";
import { Method, Router } from "@infrastructure/http";
import type { AuthController } from "@interfaces/controllers";

export const setupRoutes = (
	req: Request,
	res: Response,
	con: AuthController,
) => {
	const router = new Router(req, res);

	// Main path
	const api = router.subRouter("/api");

	// ---- AUTH
	const auth = api.subRouter("/auth");
	auth.lisPath(Method.POST, "/register", con.register.bind(con));
	auth.lisPath(Method.POST, "/login", con.login.bind(con));

	// Not found
	if (!res.hasSent()) {
		router.use((_req, res) => {
			res.sendError(404, "Not found");
		});
	}
};
