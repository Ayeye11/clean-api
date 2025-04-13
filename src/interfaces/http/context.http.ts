import type { TokenAuthPayload } from "@domain/service";

interface RequestContext {
	user?: TokenAuthPayload;
}

interface RequestHttp {
	getMethod(): string;
	getUrl(): string;
	readBody(): Record<string, unknown>;
	headerToken(): string | undefined;
	setUser(data: TokenAuthPayload): void;
	getUser(): TokenAuthPayload | undefined;
}

interface ResponseHttp {
	sendSuccess(status: number, data?: unknown, message?: string): void;
	sendError(status: number, errMsg?: string): void;
	sendThrow(err: unknown): void;
}

interface HttpContext {
	req: RequestHttp;
	res: ResponseHttp;
	next(): void;
}

export type { HttpContext, RequestContext, RequestHttp, ResponseHttp };
