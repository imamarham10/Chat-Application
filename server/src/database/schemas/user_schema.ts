import { varchar, timestamp, text, index, pgTable } from "drizzle-orm/pg-core";

const users = pgTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: varchar("password", {length: 256}),
  provider: varchar("provider", {length: 256}).default('credentials'),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
        index("email_index").on(table.email)
    ]
);

export {users}