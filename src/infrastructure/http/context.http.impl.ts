import type {
	Request as RequestExpress,
	Response as ResponseExpress,
} from "express";
import type {
	RequestContext,
	RequestHttp,
	ResponseHttp,
} from "@interfaces/http";
import type { TokenAuthPayload } from "@domain/service";
import { AppErr } from "@domain/errs";

class RequestImpl implements RequestHttp {
	private ctx: RequestContext = {};
	constructor(private readonly req: RequestExpress) {}

	getMethod(): string {
		return this.req.method;
	}

	getUrl(): string {
		return this.req.url;
	}

	readBody(): Record<string, unknown> {
		return this.req.body;
	}

	headerToken(): string | undefined {
		return this.req.headers.authorization?.split(" ")[1];
	}

	setUser(data: TokenAuthPayload): void {
		this.ctx = { user: data };
	}

	getUser(): TokenAuthPayload | undefined {
		return this.ctx.user;
	}
}

class ResponseImpl implements ResponseHttp {
	constructor(private readonly res: ResponseExpress) {}

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

export { RequestImpl, ResponseImpl };
