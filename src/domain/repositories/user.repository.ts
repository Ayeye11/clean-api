import type { UserIdentifier } from "@domain/entities";

interface UserRepository {
	// ---- Identifier
	// create
	createIdentifier(model: UserIdentifier): Promise<void>;

	// read
	isAvailable(data: {
		email?: string;
		username?: string;
	}): Promise<boolean>;
	isAvailable(
		data: {
			email?: string;
			username?: string;
		},
		conflictInfo: true,
	): Promise<"email" | "username" | null>;

	findOne(identifier: {
		email: string;
		username: string;
	}): Promise<UserIdentifier | null>;

	findMany(limit: number, offset: number): Promise<UserIdentifier[]>;
}

export type { UserRepository };
