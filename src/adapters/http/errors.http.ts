import { AppErr, ErrType } from "@domain/errs";

export enum StatusCode {
  badRequest = 400,
  unauthenticated = 401,
  forbidden = 403,
  notFound = 404,
  conflict = 409,
  internal = 500,
}

export class ErrHttp extends Error {
  private constructor(
    public status: number,
    msg: string,
  ) {
    super(msg);
  }

  // ERRORS
  static badRequest(msg: string) {
    return new ErrHttp(StatusCode.badRequest, msg);
  }

  static unauthenticated(msg: string) {
    return new ErrHttp(StatusCode.unauthenticated, msg);
  }

  static forbidden(msg: string) {
    return new ErrHttp(StatusCode.forbidden, msg);
  }

  static notFound(msg: string) {
    return new ErrHttp(StatusCode.notFound, msg);
  }

  static conflict(msg: string) {
    return new ErrHttp(StatusCode.conflict, msg);
  }

  static internal() {
    return new ErrHttp(StatusCode.internal, "Internal server error");
  }
}

// CONVERT FROM APP ERROR TO HTTP ERROR
export const convertErrorToHttp = (err: unknown): ErrHttp => {
  if (err instanceof AppErr) {
    switch (err.type) {
      case ErrType.invalidArgument:
        return ErrHttp.badRequest(err.message);
      case ErrType.unauthenticated:
        return ErrHttp.unauthenticated(err.message);
      case ErrType.forbidden:
        return ErrHttp.forbidden(err.message);
      case ErrType.notFound:
        return ErrHttp.notFound(err.message);
      case ErrType.conflict:
        return ErrHttp.conflict(err.message);
      default:
        return ErrHttp.internal();
    }
  }

  console.error(err);
  return ErrHttp.internal();
};
