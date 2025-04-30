import {migrate} from 'drizzle-orm/node-postgres/migrator';
import { db } from './db_config';
import path from 'path';

const runMigration = async() => {
    try{
        console.log("Running migrate.ts from: ", __dirname);
        console.log("Migration Started");
        const migrationFolder = path.resolve(__dirname, "../../drizzle");
        await migrate(db, {migrationsFolder: migrationFolder});
        console.log("Migration applied Successfully");
    } catch (error) {
        console.error("Error running migration:");
        if (error instanceof AggregateError) {
            for (const err of error.errors) {
                console.error(err);
            }
        } else {
            console.error(error);
        }
    }
    
}

runMigration();