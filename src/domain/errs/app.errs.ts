enum ErrType {
  invalidArgument = "INVALID_ARGUMENT",
  unauthenticated = "UNAUTHENTICATED",
  forbidden = "ACCESS_DENIED",
  notFound = "NOT_FOUND",
  conflict = "CONFLICT",
  unknown = "INTERNAL",
}

class AppErr extends Error {
  private constructor(
    public type: ErrType,
    msg: string,
  ) {
    super(msg);
  }

  // ---- GENERIC ERRORS
  static invalidArgument() {
    return new AppErr(ErrType.invalidArgument, "Invalid argument");
  }

  static validation() {
    return new AppErr(ErrType.validation, "Validation error");
  }

  static unauthenticated() {
    return new AppErr(ErrType.unauthenticated, "Unauthenticated");
  }

  static forbidden() {
    return new AppErr(ErrType.forbidden, "Access denied");
  }

  static notFound() {
    return new AppErr(ErrType.notFound, "Resource not found");
  }

  static conflict() {
    return new AppErr(ErrType.conflict, "Resource is already exists");
  }

  static unknown(err: unknown) {
    console.error(err);
    return new AppErr(ErrType.unknown, "Unexpected error");
  }

  // ---- AUTH ERRORS
  static missingToken() {
    return new AppErr(ErrType.unauthenticated, "Missing token");
  }

  static invalidToken() {
    return new AppErr(ErrType.forbidden, "Invalid token");
  }

  static invalidAuth() {
    return new AppErr(ErrType.forbidden, "Wrong user or password");
  }

  static emailExists() {
    return new AppErr(ErrType.conflict, "Email is already exists");
  }

  static usernameExists() {
    return new AppErr(ErrType.conflict, "Username is already exists");
  }
}

export { ErrType, AppErr };
