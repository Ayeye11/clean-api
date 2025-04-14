import type { IncomingMessage, ServerResponse } from "node:http";
import type { RequestContext, Request, Response } from "@interfaces/http";
import { parseBody } from "./parse.http";
import type { TokenAuthPayload } from "@domain/service";
import { AppErr } from "@domain/errs";

export class RequestImpl implements Request {
  private readonly req: IncomingMessage;
  constructor(req: IncomingMessage) {
    this.req = req;
    this.context = {
      method: req.method,
      url: { path: req.url },
    };
  }

  context: RequestContext;

  async readBody(): Promise<Record<string, unknown>> {
    return parseBody(this.req);
  }

  headerToken(): string | undefined {
    return this.req.headers.authorization?.split(" ")[1];
  }

  setUser(data: TokenAuthPayload): void {
    this.context.user = data;
  }
}

export class ResponseImpl implements Response {
  constructor(private readonly res: ServerResponse) { }

  private sendJson(status: number, data: Record<string, unknown> | null): void {
    this.res.writeHead(status, { "Content-Type": "application/json" });
    this.res.end(JSON.stringify(data));
  }

  private sent = false;

  sendSuccess(status: number, data?: unknown, message?: string): void {
    if (this.sent) return;
    this.sent = true;

    if (!data) {
      this.sendJson(status, null);
      return;
    }

    if (typeof data === "string") {
      this.sendJson(status, { message: data });
      return;
    }

    if (!message) {
      this.sendJson(status, { data: data });
      return;
    }

    this.sendJson(status, { data: data, message: message });
  }

  sendError(status: number, errMsg: string): void {
    if (this.sent) return;
    this.sent = true;
    this.sendJson(status, { error: errMsg });
  }

  sendThrow(err: unknown): void {
    if (this.sent) return;
    this.sent = true;
    if (err instanceof AppErr) {
      const [status, msg] = err.toHttp();
      this.sendJson(status, { error: msg });
      return;
    }

    console.error(err);
    this.sendJson(500, { error: "Internal server error" });
  }

  hasSent(): boolean {
    return this.sent;
  }
}
