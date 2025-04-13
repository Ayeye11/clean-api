import type { Request, Response } from "@interfaces/http";
import { Router } from "@infrastructure/http";
import type { AuthController } from "@interfaces/controllers";

export const setupRoutes = (
	req: Request,
	res: Response,
	con: AuthController,
) => {
	const api = new Router(req, res, "/api");

	const auth = api.subRouter("/auth");
	auth.post("/register", con.register.bind(con));
	auth.post("/login", con.login.bind(con));
};
