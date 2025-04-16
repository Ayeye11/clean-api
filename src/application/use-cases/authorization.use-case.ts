import { getPermissions, hasPermission } from "@application/permissions";
import type { TokenAuthPayload, TokenService } from "@application/services";
import { AppErr } from "@domain/errs";
import type { Category, Action } from "@domain/security/permissions";

export class AuthorizationUseCase {
  constructor(private readonly tokenSvc: TokenService) {}

  async authRequired(token: string | undefined): Promise<TokenAuthPayload> {
    try {
      return await this.tokenSvc.verify(token);
    } catch (err) {
      throw err instanceof AppErr ? err : AppErr.unknown(err);
    }
  }

  checkAccess(
    role: TokenAuthPayload | undefined,
    category: Category,
    action: Action,
  ): void {
    if (!role) throw AppErr.forbidden();
    const permissions = getPermissions(role.roleId);
    if (!hasPermission(permissions, category, action)) throw AppErr.forbidden();
  }
}
