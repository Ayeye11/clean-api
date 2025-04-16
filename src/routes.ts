import { RequestImpl, ResponseImpl, Router } from "@infrastructure/http";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { ControllerModule, MiddlewareModule } from "./modules";

export type Routes = (req: IncomingMessage, res: ServerResponse) => void;

const setupRoutes = (
  middlewares: MiddlewareModule,
  controllers: ControllerModule,
): Routes => {
  return (sReq, sRes) => {
    const req = new RequestImpl(sReq);
    const res = new ResponseImpl(sRes);

    // Main
    const api = new Router(req, res, "/api");

    // ---- AUTH
    const auth = api.subRouter("/auth");
    const authControllers = controllers.getAuth();
    auth.post("/register", authControllers.register.bind(authControllers));
    auth.post("/login", authControllers.login.bind(authControllers));

    // Run Routes
    const handled = api.handleRequest();

    if (!handled) {
      res.sendError(404, "Not found");
    }
  };
};

export default setupRoutes;
