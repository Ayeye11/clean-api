import type { Request, Response } from "@interfaces/http";
import { isMatchUrl } from "./url.http";
import { runMiddlewares, type Controller } from "./middleware.http";
import { isMatchMethod, type Method } from "./method.http";

export class Router {
	private mainPath: string;

	constructor(
		private readonly req: Request,
		private readonly res: Response,
		path?: string,
	) {
		this.mainPath = path ?? "";
	}

	// ---- SUB ROUTING
	subRouter(path: string, ...middlewares: Controller[]): Router {
		runMiddlewares(this.req, this.res, ...middlewares);
		return new Router(this.req, this.res, this.mainPath + path);
	}

	// ---- MIDDLEWARES
	use(...middlewares: Controller[]): void {
		runMiddlewares(this.req, this.res, ...middlewares);
	}
	useWithPath(path: string, ...middlewares: Controller[]): void {
		if (!isMatchUrl(this.req, this.mainPath, path)) return;
		runMiddlewares(this.req, this.res, ...middlewares);
	}

	// ---- CONTROLLERS ENDPOINTS
	lisPath(method: Method, path: string, ...controllers: Controller[]) {
		if (!isMatchMethod(this.req, method)) return;
		if (!isMatchUrl(this.req, this.mainPath, path)) return;

		runMiddlewares(this.req, this.res, ...controllers);
	}
}
