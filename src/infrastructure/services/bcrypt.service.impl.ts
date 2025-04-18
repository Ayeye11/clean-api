import type { HashService } from "@application/services";
import { compare, hash } from "bcrypt";

export class BcryptService implements HashService {
	hash(plain: string): Promise<string> {
		return hash(plain, 10);
	}

	compare(plain: string, hash: string): Promise<boolean> {
		return compare(plain, hash);
	}
}
