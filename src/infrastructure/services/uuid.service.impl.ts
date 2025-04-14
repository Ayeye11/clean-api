import type { IdService } from "@application/services";
import { v4, validate } from "uuid";

export class UuidService implements IdService {
	create(): string {
		return v4();
	}

	isValid(id: string): boolean {
		return validate(id);
	}
}
