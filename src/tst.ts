interface UrlResult {
	matched: boolean;
	params: Record<string, string>;
	query: Record<string, string>;
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
			return getData ? { matched: false, query: {}, params: {} } : false;
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

const url = "/api/users/employee?p=2&s=14";
const path = "/api/users/:role";

const main = async () => {
	try {
		const result = readPath(url, path, true);
		const { p, s } = result.query;
		const { role } = result.params;
		console.log(`Role: ${role}`);
		console.log(`page: ${p}`);
		console.log(`size: ${s}`);
	} catch (err) {
		console.error(err);
	}
};
main();
