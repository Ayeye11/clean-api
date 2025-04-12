import type { UserIdentifier } from "@domain/entities";
import { AppErr } from "@domain/errs";
import type { TokenAuthPayload, TokenService } from "@domain/service";
import jwt from "jsonwebtoken";
const { sign, verify } = jwt;

export class JwtService implements TokenService {
	constructor(private readonly secretKey: string) {}

	create(user: UserIdentifier): Promise<string> {
		const payload: TokenAuthPayload = {
			userId: user.id,
			roleId: user.roleId,
		};
		return new Promise((resolve, reject) => {
			try {
				const token = sign(payload, this.secretKey, {
					algorithm: "HS256",
					expiresIn: "1h",
				});
				resolve(token);
			} catch (err) {
				reject(err);
			}
		});
	}

	verify(token: string | undefined): Promise<TokenAuthPayload> {
		return new Promise((resolve, reject) => {
			try {
				if (!token) throw AppErr.missingToken();
				const payload = verify(token, this.secretKey);
				resolve(payload as TokenAuthPayload);
			} catch (err) {
				reject(err);
			}
		});
	}
}
