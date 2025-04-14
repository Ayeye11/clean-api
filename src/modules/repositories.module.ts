import type { UserRepository } from "@domain/repositories";
import { UserIdentifierModel } from "@infrastructure/database/models";
import { UserRepositoryImpl } from "@infrastructure/database/repository";
import type { DataSource } from "typeorm";

export class RepositoryModule {
	private static user?: UserRepository;

	constructor(private readonly driver: DataSource) {}

	getUser() {
		if (!RepositoryModule.user) {
			RepositoryModule.user = new UserRepositoryImpl(
				this.driver.getRepository(UserIdentifierModel),
			);
		}

		return RepositoryModule.user;
	}
}
