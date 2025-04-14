import type { UserIdentifier } from "@domain/entities";

interface TokenAuthPayload {
	userId: string;
	roleId: string;
}

interface TokenService {
	create(user: UserIdentifier): Promise<string>;
	verify(token: string | undefined): Promise<TokenAuthPayload>;
}

export type { TokenAuthPayload, TokenService };
