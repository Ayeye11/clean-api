import { Server, type IncomingMessage, type ServerResponse } from "node:http";

class ServerHttp {
	private readonly server: Server;

	constructor(router: (req: IncomingMessage, res: ServerResponse) => void) {
		this.server = new Server(router);
	}
}
