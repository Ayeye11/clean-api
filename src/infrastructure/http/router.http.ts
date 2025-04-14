import type { Request, Response } from "@interfaces/http";
import { isMatchMethod, Method } from "./method.http";
import { runControllers, type Controller } from "./controllers.http";
import { isMatchUrl } from "./url.http";

interface Route {
	method: Method;
	path: string;
	controllers: Controller[];
}

export class Router {
	private routes: Route[] = [];
	private middlewares: Controller[] = [];
	private subRouters: Router[] = [];

	constructor(
		private readonly req: Request,
		private readonly res: Response,
		private readonly mainPath = "",
	) {}

	// ---- SUB ROUTING
	subRouter(path: string, ...middlewares: Controller[]): Router {
		const sub = new Router(this.req, this.res, this.mainPath + path);
		sub.middlewares.push(...middlewares);
		this.subRouters.push(sub);
		return sub;
	}

	// ---- MIDDLEWARES
	use(...middlewares: Controller[]): void {
		this.middlewares.push(...middlewares);
	}

	// ---- ENDPOINTS
	register(method: Method, path: string, ...controllers: Controller[]) {
		this.routes.push({ method, path: this.mainPath + path, controllers });
	}

	// With methods
	post(path: string, ...controllers: Controller[]) {
		this.register(Method.POST, path, ...controllers);
	}
	get(path: string, ...controllers: Controller[]) {
		this.register(Method.GET, path, ...controllers);
	}
	put(path: string, ...controllers: Controller[]) {
		this.register(Method.PUT, path, ...controllers);
	}
	patch(path: string, ...controllers: Controller[]) {
		this.register(Method.PATCH, path, ...controllers);
	}
	delete(path: string, ...controllers: Controller[]) {
		this.register(Method.DELETE, path, ...controllers);
	}

	// Handle request
	handleRequest(): boolean {
		// Routes
		for (const route of this.routes) {
			if (this.res.ctx.sent) return true;
			if (!isMatchMethod(this.req, route.method)) continue;
			if (!isMatchUrl(this.req, route.path)) continue;

			runControllers(
				this.req,
				this.res,
				...this.middlewares,
				...route.controllers,
			);
			return true;
		}

		// SubRouters
		for (const sub of this.subRouters) {
			if (sub.handleRequest()) return true;
		}

		return false;
	}
}
