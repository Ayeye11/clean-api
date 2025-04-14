import { Server } from "node:http";
import type { Routes } from "./routes";

class ServerHttp {
	private readonly server: Server;

	constructor(routes: Routes) {
		this.server = new Server(routes);
	}

	run(port: number, host?: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.server.listen(port, host, () => {
				console.log("Server running on %s:%d", host, port);
				resolve();
			});

			this.server.on("error", (err) => {
				console.error("Failed starting the server");
				reject(err);
			});
		});
	}

	close(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.server.close((err) => {
				console.error("Failed to close the server");
				reject(err);
			});

			console.log("Server closed gracefully");
			resolve();
		});
	}
}

export default ServerHttp;
