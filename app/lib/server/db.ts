import { Pool } from "pg";
import config from "./config";

/**
 * The function `getPool` creates a new Pool object with a PostgreSQL connection string from the
 * config.
 *
 * @returns An instance of the Pool class with a connection string provided by the config.POSTGRES_URL
 * configuration.
 */
export function getPool(): Pool {
    const pool = new Pool({
        connectionString: config.POSTGRES_URL,
    });

    return pool;
}