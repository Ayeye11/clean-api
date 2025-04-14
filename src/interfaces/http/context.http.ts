import type { TokenAuthPayload } from "@domain/service";

// ---- REQUEST
interface RequestContext {
	user?: TokenAuthPayload;
	url?: UrlParams;
	method?: string;
}

interface UrlParams {
	path?: string;
	query?: Record<string, string>;
	params?: Record<string, string>;
}

interface Request {
	ctx: RequestContext;
	readBody(): Promise<Record<string, unknown>>;
	headerToken(): string | undefined;
	setUser(data: TokenAuthPayload): void;
}

interface ResponseContext {
	sent?: boolean;
}

// ---- RESPONSE
interface Response {
	ctx: ResponseContext;
	sendSuccess(status: number, data?: unknown, message?: string): void;
	sendError(status: number, errMsg?: string): void;
	sendThrow(err: unknown): void;
}

export type { RequestContext, Request, ResponseContext, Response };
