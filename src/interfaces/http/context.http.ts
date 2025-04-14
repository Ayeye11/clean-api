import type { TokenAuthPayload } from "@domain/service";

// ---- REQUEST
export interface RequestContext {
  user?: TokenAuthPayload;
  url?: UrlParams;
  method?: string;
}

export interface UrlParams {
  path?: string;
  query?: Record<string, string>;
  params?: Record<string, string>;
}

export interface Request {
  context: RequestContext;
  readBody(): Promise<Record<string, unknown>>;
  headerToken(): string | undefined;
  setUser(data: TokenAuthPayload): void;
}

// ---- RESPONSE
export interface Response {
  sendSuccess(status: number, data?: unknown, message?: string): void;
  sendError(status: number, errMsg?: string): void;
  sendThrow(err: unknown): void;
  hasSent(): boolean;
}
