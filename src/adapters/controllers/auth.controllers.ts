import { LoginDto, RegisterDto } from "@adapters/dtos/auth";
import createDto from "@adapters/dtos/create";
import {
  sendError,
  sendSuccess,
  type RequestHttp,
  type ResponseHttp,
} from "@adapters/http";
import type { AuthUseCase } from "@application/use-cases";

export class AuthControllers {
  constructor(private readonly authUseCase: AuthUseCase) { }

  async register(req: RequestHttp, res: ResponseHttp) {
    try {
      // Get request
      const dto = createDto(req.body, RegisterDto.create);

      // Use case
      await this.authUseCase.register(dto);

      // Response
      sendSuccess(res, 201, "Register successfully");
    } catch (err) {
      sendError(res, err);
    }
  }

  async login(req: RequestHttp, res: ResponseHttp) {
    try {
      // Get Request
      const dto = createDto(req.body, LoginDto.create);

      // Use case
      const token = await this.authUseCase.login(dto);

      // Response
      return sendSuccess(res, 200, { token: token }, "Login successfully");
    } catch (err) {
      sendError(res, err);
    }
  }
}
