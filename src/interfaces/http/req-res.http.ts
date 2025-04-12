import type { TokenAuthPayload } from "@domain/service";

interface RequestHttp {
	body: Record<string, unknown>;
	headerToken: string | undefined;
	userCtx: TokenAuthPayload;
}

interface ResponseHttp {
	sendSuccess(status: number, data: unknown, message?: string): ResponseHttp;
	sendError(status: number, errMsg: string): ResponseHttp;
	sendThrow(err: unknown): ResponseHttp;
}

export type { RequestHttp, ResponseHttp };
