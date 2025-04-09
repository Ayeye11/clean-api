import type { UserIdentifier } from "@domain/entities";

interface TokenPayload {
  userId: string;
  roleId: string;
}

interface AuthService {
  createToken(user: UserIdentifier): Promise<string>;
  verifyToken(token: string): Promise<TokenPayload>;
}

export type { TokenPayload, AuthService };
