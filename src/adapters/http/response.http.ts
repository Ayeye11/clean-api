import { convertErrorToHttp } from "./errors.http";
import type { ResponseHttp } from "./framework.http";

export const sendSuccess = (
  res: ResponseHttp,
  status: number,
  data: Record<string, unknown> | string | null,
  message?: string,
) => {
  const r = res.status(status);
  if (!data) return r.json(null);
  if (typeof data === "string") return r.json({ message: data });
  if (!message) return r.json({ data: data });
  return r.json({ data: data, message: message });
};

export const sendError = (res: ResponseHttp, err: unknown) => {
  const errHttp = convertErrorToHttp(err);
  return res.status(errHttp.status).json({ error: errHttp.message });
};
