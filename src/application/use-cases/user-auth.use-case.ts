import type { UserIdentifier } from "@domain/entities";
import { AppErr } from "@domain/errs";
import type { UserIdentifierRepository } from "@domain/repositories";
import type { AuthService, HashService, IdService } from "@domain/services";

class AuthUseCase {
  constructor(
    private readonly userRepo: UserIdentifierRepository,
    private readonly authSvc: AuthService,
    private readonly idSvc: IdService,
    private readonly hashSvc: HashService,
  ) { }

  async register(data: {
    email: string;
    username: string;
    password: string;
  }): Promise<void> {
    try {
      // Check if exists
      const conflict = await this.userRepo.isAvailable({
        email: data.email,
        username: data.username,
      });
      if (conflict) {
        if (conflict === "email") throw AppErr.emailExists();
        if (conflict === "username") throw AppErr.usernameExists();
      }

      // Setup user
      const user: UserIdentifier = {
        id: this.idSvc.create(),
        roleId: "NOT_IMPLEMENTED",
        email: data.email,
        username: data.username,
        password: await this.hashSvc.create(data.password),
      };

      // Try to save
      await this.userRepo.create(user);
    } catch (err) {
      throw err instanceof AppErr ? err : AppErr.unknown(err);
    }
  }

  async login(data: {
    identifier: string;
    password: string;
  }): Promise<string> {
    try {
      // Get user
      const user = await this.userRepo.findOneBy({
        email: data.identifier,
        username: data.identifier,
      });

      // Compare credentials
      if (
        !user ||
        !(await this.hashSvc.compare(data.password, user.password))
      ) {
        throw AppErr.invalidAuth();
      }

      // Create token
      return await this.authSvc.createToken(user);
    } catch (err) {
      throw err instanceof AppErr ? err : AppErr.unknown(err);
    }
  }
}

export { AuthUseCase };
