import { UserIdentifierModel } from "@infrastructure/database/models";
import { DataSource } from "typeorm";

export class Database {
	private static db?: DataSource;
	private constructor() {}

	static getInstance() {
		if (Database.db) return Database.db;

		Database.db = new DataSource({
			type: "mysql",
			host: "localhost",
			port: 3306,
			username: "root",
			password: "password",
			database: "clean_api_db",
			synchronize: false,
			entities: [UserIdentifierModel],
		});

		return Database.db;
	}
}
