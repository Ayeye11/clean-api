enum Code {
	INVALID_ARGUMENT = "INVALID_ARGUMENT",
	UNAUTHENTICATED = "UNAUTHENTICATED",
	FORBIDDEN = "ACCESS_DENIED",
	NOT_FOUND = "NOT_FOUND",
	CONFLICT = "CONFLICT",
	UNKNOWN = "UNKNOWN_ERROR",
}

class AppErr extends Error {
	private constructor(
		public code: Code,
		msg: string,
	) {
		super(msg);
	}

	// To HTTP
	toHttp(): [number, string] {
		switch (this.code) {
			case Code.INVALID_ARGUMENT:
				return [400, this.message];
			case Code.UNAUTHENTICATED:
				return [401, this.message];
			case Code.FORBIDDEN:
				return [403, this.message];
			case Code.NOT_FOUND:
				return [404, this.message];
			case Code.CONFLICT:
				return [409, this.message];
			case Code.UNKNOWN:
				return [500, "Internal server error"];
			default:
				return [500, "Internal server error"];
		}
	}

	// Generic Errors
	static invalidArgument(): AppErr {
		return new AppErr(Code.INVALID_ARGUMENT, "Invalid argument");
	}
	static unauthenticated(): AppErr {
		return new AppErr(Code.UNAUTHENTICATED, "Unauthenticated");
	}
	static forbidden(): AppErr {
		return new AppErr(Code.FORBIDDEN, "Access denied");
	}
	static notFound(): AppErr {
		return new AppErr(Code.NOT_FOUND, "Resource not found");
	}
	static conflict(): AppErr {
		return new AppErr(Code.CONFLICT, "Resource is already exists");
	}
	static unknown(err: unknown): AppErr {
		console.error(err);
		return new AppErr(Code.UNKNOWN, "Unknown");
	}

	// Authenticated errors
	static missingToken(): AppErr {
		return new AppErr(Code.UNAUTHENTICATED, "Missing token");
	}
	static invalidAuth(): AppErr {
		return new AppErr(Code.UNAUTHENTICATED, "Wrong user or password");
	}
	static invalidToken(): AppErr {
		return new AppErr(Code.UNAUTHENTICATED, "Invalid token");
	}
	static emailExists(): AppErr {
		return new AppErr(Code.CONFLICT, "Email is already used");
	}
	static usernameExists(): AppErr {
		return new AppErr(Code.CONFLICT, "Username is already used");
	}
}

export { Code, AppErr };
