import type { Request, Response } from "@interfaces/http";
import { isMatchUrl } from "./url.http";
import { runMiddlewares, type Controller } from "./middleware.http";
import { isMatchMethod, Method } from "./method.http";

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

	// ---- ENDPOINTS
	lisPath(method: Method, path: string, ...controllers: Controller[]): boolean {
		if (!isMatchMethod(this.req, method)) return false;
		if (!isMatchUrl(this.req, this.mainPath, path)) return false;

		runMiddlewares(this.req, this.res, ...controllers);
		return true;
	}

	// With methods
	post(path: string, ...controllers: Controller[]): boolean {
		return this.lisPath(Method.POST, path, ...controllers);
	}
	get(path: string, ...controllers: Controller[]): boolean {
		return this.lisPath(Method.GET, path, ...controllers);
	}
	put(path: string, ...controllers: Controller[]): boolean {
		return this.lisPath(Method.PUT, path, ...controllers);
	}
	patch(path: string, ...controllers: Controller[]): boolean {
		return this.lisPath(Method.PATCH, path, ...controllers);
	}
	delete(path: string, ...controllers: Controller[]): boolean {
		return this.lisPath(Method.DELETE, path, ...controllers);
	}
}
