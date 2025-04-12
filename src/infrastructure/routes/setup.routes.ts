import { RequestImpl, ResponseImpl } from "@infrastructure/http";
import type { AuthController } from "@interfaces/controllers";
import type { RequestHttp, ResponseHttp } from "@interfaces/http";
import type { Express } from "express";

enum Method {
	POST = "POST",
	GET = "GET",
	PUT = "PUT",
	PATCH = "PATCH",
	DELETE = "DELETE",
}

const listenPath = (
	cReq: RequestHttp,
	cRes: ResponseHttp,
	method: Method,
	path: string,
	controller: (req: RequestHttp, res: ResponseHttp) => Promise<void>,
) => {
	if (path === cReq.getUrl() && method === cReq.getMethod()) {
		return controller(cReq, cRes);
	}
	return;
};

class Router {
	constructor(
		private readonly app: Express,
		private readonly authControllers: AuthController,
	) {}

	async setup() {
		this.app.use("/api", (reqExpress, resExpress) => {
			const req = new RequestImpl(reqExpress);
			const res = new ResponseImpl(resExpress);

			listenPath(
				req,
				res,
				Method.POST,
				"/auth/register",
				this.authControllers.register.bind(this.authControllers),
			);

			listenPath(
				req,
				res,
				Method.POST,
				"/auth/login",
				this.authControllers.login.bind(this.authControllers),
			);

			this.app.use("/", (_req, res) => {
				res.status(404).json({ error: "Not found" });
			});
		});
	}
}

export default Router;
