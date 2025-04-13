import type { Request } from "@interfaces/http";

interface UrlResult {
	matched: boolean;
	params?: Record<string, string>;
	query?: Record<string, string>;
}

function readPath(url: string, listenPath: string): boolean;
function readPath(url: string, listenPath: string, getData: true): UrlResult;
function readPath(
	url: string,
	listenPath: string,
	getData?: boolean,
): boolean | UrlResult {
	// Path
	if (!url.startsWith("/") || !listenPath.startsWith("/")) {
		throw Error("Invalid path");
	}

	// Divide
	const arrayPath = listenPath.split("/");
	arrayPath.shift();

	const arrayUrl = url.split("/");
	arrayUrl.shift();

	// Compare Urls
	for (let i = 0; i < arrayPath.length; i++) {
		const path = arrayPath[i];
		const url = arrayUrl[i];
		if (path?.includes(":")) continue;
		if (url?.split("?")[0] !== path) {
			return getData ? { matched: false } : false;
		}
	}
	if (!getData) return true;

	// Get query
	const queryObj: Record<string, string> = {};
	const query = arrayUrl[arrayUrl.length - 1]?.split("?")[1];
	if (query) {
		for (const q of query.split("&")) {
			const [key, value] = q.split("=");
			if (key) queryObj[key] = value ?? "";
		}
	}

	// Get param
	const paramObj: Record<string, string> = {};
	for (let i = 0; i < arrayPath.length; i++) {
		if (arrayPath[i]?.startsWith(":")) {
			const param = arrayPath[i]?.slice(1);
			if (!param) continue;
			paramObj[param] = arrayUrl[i]?.split("?")[0] ?? "";
		}
	}

	return { matched: true, query: queryObj, params: paramObj };
}

const isMatchUrl = (req: Request, ...paths: string[]): boolean => {
	if (!req.context.url?.path) return false;

	const path = paths.join("");

	const result = readPath(req.context.url?.path, path, true);
	if (!result.matched) return false;

	req.context.url.query = result.query;
	req.context.url.params = result.params;
	return true;
};

export { isMatchUrl, readPath };
