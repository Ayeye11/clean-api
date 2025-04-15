import { models } from "@infrastructure/database/models";
import { DataSource } from "typeorm";

interface DatabaseConfig {
	host: string;
	port: number;
	user: string;
	password: string;
	database: string;
}

class Database {
	private readonly db: DataSource;

	constructor(cfg: DatabaseConfig) {
		this.db = new DataSource({
			type: "mysql",
			host: cfg.host,
			port: cfg.port,
			username: cfg.user,
			password: cfg.password,
			database: cfg.database,
			synchronize: false,
			entities: models,
			// migrations:
		});
	}

	async connect(): Promise<DataSource> {
		try {
			const instance = this.db.initialize();
			console.log("Database connected");
			return instance;
		} catch (err) {
			console.error("Failed to connect to the database");
			throw err;
		}
	}

	async close(): Promise<void> {
		try {
			this.db.destroy();
			console.log("Database connection closed gracefully");
		} catch (err) {
			console.error("Failed closing database connection");
			throw err;
		}
	}
}

export default Database;
