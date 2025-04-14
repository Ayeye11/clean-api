import { AppErr } from "@domain/errs";
import type { IncomingMessage } from "node:http";
import { StringDecoder } from "node:string_decoder";

export const parseBody = (
	req: IncomingMessage,
): Promise<Record<string, unknown>> => {
	return new Promise((resolve, reject) => {
		const decoder = new StringDecoder("utf-8");
		let buffer = "";

		req.on("data", (chunk) => {
			buffer += decoder.write(chunk);
		});

		req.on("end", () => {
			buffer += decoder.end();
			try {
				const parsed = JSON.parse(buffer);
				resolve(parsed as Record<string, unknown>);
			} catch (err) {
				reject(AppErr.invalidArgument());
			}
		});

		req.on("error", (err) => reject(err));
	});
};
