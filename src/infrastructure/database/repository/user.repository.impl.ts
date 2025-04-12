import type { UserIdentifier } from "@domain/entities";
import type { UserRepository } from "@domain/repositories";
import type { Repository } from "typeorm";
import type { UserIdentifierModel } from "../models";

export class UserRepositoryImpl implements UserRepository {
	constructor(private readonly orm: Repository<UserIdentifierModel>) {}

	async createIdentifier(model: UserIdentifier): Promise<void> {
		await this.orm.save(model);
	}

	async isAvailable(data: {
		email?: string;
		username?: string;
	}): Promise<boolean>;
	async isAvailable(
		data: { email?: string; username?: string },
		conflictInfo: true,
	): Promise<"email" | "username" | null>;
	async isAvailable(
		data: { email?: string; username?: string },
		conflictInfo?: boolean,
	): Promise<boolean | "email" | "username" | null> {
		if (data.email) {
			const u = await this.orm.findOneBy({ email: data.email });
			if (u) return conflictInfo ? "email" : false;
		}

		if (data.username) {
			const u = await this.orm.findOneBy({ username: data.username });
			if (u) return conflictInfo ? "username" : false;
		}

		return conflictInfo ? null : true;
	}

	async findOne(identifier: {
		email: string;
		username: string;
	}): Promise<UserIdentifier | null> {
		if (identifier.email) {
			const u = this.orm.findOneBy({ email: identifier.email });
			if (u) return u;
		}

		if (identifier.username) {
			return this.orm.findOneBy({ username: identifier.username });
		}

		return null;
	}

	async findMany(limit: number, offset: number): Promise<UserIdentifier[]> {
		return new Array<UserIdentifier>();
	}
}
