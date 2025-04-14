import type { TokenService } from "@domain/service";
import type { Controller } from "@infrastructure/http";

export const authRequired = (tokenSvc: TokenService): Controller => {
	return async (req, res, next) => {
		try {
			const token = req.headerToken();
			const payload = await tokenSvc.verify(token);
			req.setUser(payload);

			next();
		} catch (err) {
			res.sendThrow(err);
		}
	};
};
