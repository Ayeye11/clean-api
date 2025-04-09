import type { TokenPayload } from "@domain/services";

interface RequestHttp {
  user: TokenPayload;
  body: Record<string, unknown>;
}

interface ResponseHttp {
  status(code: number): ResponseHttp;
  json(data: Record<string, unknown> | null): ResponseHttp;
}

export type { RequestHttp, ResponseHttp };
