import type { Request, Response } from "@interfaces/http";
import { isMatchMethod, Method } from "./method.http";
import { isMatchUrl } from "./url.http";

type Controller = (req: Request, res: Response) => void;

export class Router {
	private mainPath: string;

	constructor(
		private readonly req: Request,
		private readonly res: Response,
		path?: string,
	) {
		this.mainPath = path ?? "";
	}

	subRouter(path: string): Router {
		return new Router(this.req, this.res, this.mainPath + path);
	}

	post(path: string, controller: Controller) {
		if (!isMatchMethod(this.req, Method.POST)) return;
		if (!isMatchUrl(this.req, this.mainPath, path)) return;

		return controller(this.req, this.res);
	}

	get(path: string, controller: Controller) {
		if (!isMatchMethod(this.req, Method.GET)) return;
		if (!isMatchUrl(this.req, this.mainPath, path)) return;

		return controller(this.req, this.res);
	}

	put(path: string, controller: Controller) {
		if (!isMatchMethod(this.req, Method.PUT)) return;
		if (!isMatchUrl(this.req, this.mainPath, path)) return;

		return controller(this.req, this.res);
	}

	patch(path: string, controller: Controller) {
		if (!isMatchMethod(this.req, Method.PATCH)) return;
		if (!isMatchUrl(this.req, this.mainPath, path)) return;

		return controller(this.req, this.res);
	}

	delete(path: string, controller: Controller) {
		if (!isMatchMethod(this.req, Method.DELETE)) return;
		if (!isMatchUrl(this.req, this.mainPath, path)) return;

		return controller(this.req, this.res);
	}
}
