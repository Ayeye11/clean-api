import type { Request, Response } from "@interfaces/http";

export type Controller = (
	req: Request,
	res: Response,
	next: () => void,
) => void;

export const runControllers = (
	req: Request,
	res: Response,
	...controllers: Controller[]
): void => {
	let i = 0;

	const next = () => {
		if (i >= controllers.length || res.ctx.sent) return;
		const controller = controllers[i++];
		if (controller) {
			controller(req, res, next);
		}
	};

	next();
};
