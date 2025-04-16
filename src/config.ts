import { serialize } from "typeorm/browser";

// ENVIRONMENT
const getEnv = <T>(key: string, fallback: T): T => {
  const value = process.env[key];
  if (!value) return fallback;

  if (typeof fallback === "string") return value as T;

  if (typeof fallback === "number") {
    const int = Number.parseInt(value);
    return Number.isNaN(int) ? fallback : (int as T);
  }

  return fallback;
};

interface Environment {
  serverHost: string;
  serverPort: number;

  sqlHost: string;
  sqlPort: number;
  sqlUser: string;
  sqlPassword: string;
  sqlDatabase: string;

  secretKey: string;
}

const loadEnvironment = (): Environment => {
  return {
    serverHost: getEnv("SERVER_HOST", "localhost"),
    serverPort: getEnv("SERVER_PORT", 3000),

    sqlHost: getEnv("SQL_HOST", "localhost"),
    sqlPort: getEnv("SQL_PORT", 3306),
    sqlUser: getEnv("SQL_USER", "root"),
    sqlPassword: getEnv("SQL_PASSWORD", "password"),
    sqlDatabase: getEnv("SQL_DATABASE", "clean_api_db"),

    secretKey: getEnv("SECRET_KEY", "secretKey"),
  };
};

// CONFIGURATION
interface ServerConfig {
  host: string;
  port: number;
}

interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

interface Configuration {
  server: ServerConfig;
  database: DatabaseConfig;
  tokenKey: string;
}

const loadConfiguration = (env: Environment): Configuration => {
  return {
    server: {
      host: env.serverHost,
      port: env.serverPort,
    },

    database: {
      host: env.sqlHost,
      port: env.sqlPort,
      user: env.sqlUser,
      password: env.sqlPassword,
      database: env.sqlDatabase,
    },

    tokenKey: env.secretKey,
  };
};

export type { Environment, ServerConfig, DatabaseConfig, Configuration };
export { loadEnvironment, loadConfiguration };
