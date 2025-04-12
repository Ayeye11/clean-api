import type { AuthenticateUseCase } from "@application/use-case";
import { LoginDto, RegisterDto } from "@interfaces/dtos/auth";
import type { RequestHttp, ResponseHttp } from "@interfaces/http";

class AuthController {
	constructor(private readonly authUseCase: AuthenticateUseCase) {}

	async register(req: RequestHttp, res: ResponseHttp) {
		try {
			// Get body
			const [err, dto] = RegisterDto.create(req.readBody());
			if (err) {
				res.sendError(400, err);
				return;
			}
			if (!dto) {
				res.sendError(500, "Unexpected undefined dto");
				return;
			}

			//  Use case
			await this.authUseCase.register(dto);

			// Response
			res.sendSuccess(201, "Register successfully");
		} catch (err) {
			res.sendThrow(err);
		}
	}

	async login(req: RequestHttp, res: ResponseHttp) {
		try {
			// Get body
			const [err, dto] = LoginDto.create(req.readBody());
			if (err) {
				res.sendError(400, err);
				return;
			}
			if (!dto) {
				res.sendError(500, "Unexpected undefined dto");
				return;
			}

			// Use case
			const token = await this.authUseCase.login(dto);

			// Response
			res.sendSuccess(200, { token: token }, "Login successfully");
		} catch (err) {
			res.sendThrow(err);
		}
	}
}

export { AuthController };
