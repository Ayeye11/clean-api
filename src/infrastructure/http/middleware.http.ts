import type { Request, Response } from "@interfaces/http";

export type Controller = (
  req: Request,
  res: Response,
  next?: () => void,
) => void;

export const runMiddlewares = (
  req: Request,
  res: Response,
  ...controllers: Controller[]
): void => {
  let i = 0;
  let lock = false;

  const next = () => {
    if (res.hasSent()) return;
    if (lock) return;
    lock = true;

    const middleware = controllers[i++];
    if (middleware) {
      lock = false;
      middleware(req, res, next);
    }
  };

  next();
};
