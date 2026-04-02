import { Pool } from "pg";
import config from "./config";

export function getPool(): Pool {
    const pool = new Pool({
        connectionString: config.POSTGRES_URL,
    });

    return pool;
}