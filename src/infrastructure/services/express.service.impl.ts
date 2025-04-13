import { AppErr } from "@domain/errs";
import type { TokenAuthPayload } from "@domain/service";
import type {
	HttpContext,
	RequestContext,
	RequestHttp,
	ResponseHttp,
} from "@interfaces/http";
import type { Request, Response, NextFunction } from "express";

class RequestHttpImpl implements RequestHttp {
	constructor(private readonly req: Request) {}

	private static context: RequestContext;

	readBody(): Record<string, unknown> {
		return this.req.body;
	}

	getUrl(): string {
		return this.req.url;
	}

	getMethod(): string {
		return this.req.method;
	}

	headerToken(): string | undefined {
		return this.req.headers.authorization?.split(" ")[1];
	}

	setUser(data: TokenAuthPayload): void {
		RequestHttpImpl.context.user = data;
	}

	getUser(): TokenAuthPayload | undefined {
		return RequestHttpImpl.context.user;
	}
}

class ResponseHttpImpl implements ResponseHttp {
	constructor(private readonly res: Response) {}

	sendSuccess(status: number, data?: unknown, message?: string): void {
		const r = this.res.status(status);
		if (!data) {
			r.json(null);
			return;
		}

		if (typeof data === "string") {
			r.json({ message: data });
			return;
		}

		if (!message) {
			r.json({ data: data });
			return;
		}

		r.json({ data: data, message: message });
	}

	sendError(status: number, errMsg: string): void {
		this.res.status(status).json({ error: errMsg });
	}

	sendThrow(err: unknown): void {
		if (err instanceof AppErr) {
			const [status, msg] = err.toHttp();
			this.res.status(status).json({ error: msg });
			return;
		}

		console.error(err);
		this.res.status(500).json({ error: "Internal server error" });
	}
}

class HttpContextImpl implements HttpContext {
	constructor(
		request: RequestHttp,
		response: ResponseHttp,
		next: NextFunction,
	) {
		this.req = request;
		this.res = response;
		this.next = next;
	}

	next(): void {
		this.next();
	}
	readonly req: RequestHttp;
	readonly res: ResponseHttp;
}

export { RequestHttpImpl, ResponseHttpImpl, HttpContextImpl };
