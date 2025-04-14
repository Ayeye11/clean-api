import type { UserIdentifier } from "@domain/entities";
import type { UserRepository } from "@domain/repositories";
import type { Repository } from "typeorm";
import { UserIdentifierModel } from "../models";

export class UserRepositoryImpl implements UserRepository {
	constructor(private readonly orm: Repository<UserIdentifierModel>) {}

	async createIdentifier(entity: UserIdentifier): Promise<void> {
		const model = UserIdentifierModel.create(entity);
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
	}): Promise<UserIdentifier | undefined> {
		if (identifier.email) {
			const u = await this.orm.findOneBy({ email: identifier.email });
			if (u) return u.toEntity();
		}

		if (identifier.username) {
			const u = await this.orm.findOneBy({ username: identifier.username });
			if (u) return u.toEntity();
		}

		return undefined;
	}

	async findMany(limit: number, offset: number): Promise<UserIdentifier[]> {
		const users = await this.orm
			.find({ take: limit, skip: offset })
			.then((users) => users.map((u) => u.toEntity()));
		return users;
	}
}
