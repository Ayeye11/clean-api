import type { Request, Response } from "@interfaces/http";
import { isMatchMethod, Method } from "./method.http";
import { isMatchUrl } from "./url.http";
import { runMiddlewares, type Controller } from "./middleware.http";

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
  post(path: string, ...controllers: Controller[]) {
    if (!isMatchMethod(this.req, Method.POST)) return;
    if (!isMatchUrl(this.req, this.mainPath, path)) return;

    runMiddlewares(this.req, this.res, ...controllers);
  }

  get(path: string, ...controllers: Controller[]) {
    if (!isMatchMethod(this.req, Method.GET)) return;
    if (!isMatchUrl(this.req, this.mainPath, path)) return;

    runMiddlewares(this.req, this.res, ...controllers);
  }

  put(path: string, ...controllers: Controller[]) {
    if (!isMatchMethod(this.req, Method.PUT)) return;
    if (!isMatchUrl(this.req, this.mainPath, path)) return;

    runMiddlewares(this.req, this.res, ...controllers);
  }

  patch(path: string, ...controllers: Controller[]) {
    if (!isMatchMethod(this.req, Method.PATCH)) return;
    if (!isMatchUrl(this.req, this.mainPath, path)) return;

    runMiddlewares(this.req, this.res, ...controllers);
  }

  delete(path: string, ...controllers: Controller[]) {
    if (!isMatchMethod(this.req, Method.DELETE)) return;
    if (!isMatchUrl(this.req, this.mainPath, path)) return;

    runMiddlewares(this.req, this.res, ...controllers);
  }
}
