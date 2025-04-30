import { defineConfig } from "drizzle-kit";
import config from "./config";

const { DB_HOST, DB_PASSWORD, DB_NAME } = config;

export default defineConfig({
  schema: ["./src/database/schemas/*"],
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: DB_HOST,
    user: "delivery_pickup_6npu_user",
    password: DB_PASSWORD,
    database: DB_NAME,
  },
});
