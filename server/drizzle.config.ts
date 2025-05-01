import { defineConfig } from "drizzle-kit";
import config from "./config";

const { DB_HOST, DB_PASSWORD, DB_NAME, DB_USERNAME } = config;

export default defineConfig({
  schema: ["./src/database/schemas/*"],
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    ssl: false
  },
});
