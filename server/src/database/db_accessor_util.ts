import { PoolClient } from "pg";
import { pool } from "./db_config";

const runQuery = async (query: string, paramsArray: unknown[]): Promise<unknown> => {
    const client: PoolClient = await pool.connect();

    try {
        const responseFromDB = await client.query(query, paramsArray);
        return responseFromDB.rows;
    } finally {
        client.release();
    }
};

export { runQuery };
