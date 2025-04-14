import type { Request } from "@interfaces/http";

enum Method {
	POST = "POST",
	GET = "GET",
	PUT = "PUT",
	PATCH = "PATCH",
	DELETE = "DELETE",
}

const isMatchMethod = (req: Request, method: Method): boolean => {
	if (!req.ctx.method) return false;
	return req.ctx.method === method;
};

export { Method, isMatchMethod };
