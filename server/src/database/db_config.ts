import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import config from "../../config";

const { DB_NAME, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT } = config;

const pool = new Pool({
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
});

const db = drizzle(pool);

export { db, pool };
