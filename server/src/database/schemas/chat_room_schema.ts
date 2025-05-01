import { pgTable, varchar, timestamp, foreignKey, index } from "drizzle-orm/pg-core";
import { users } from "./user_schema";
import { boolean } from "drizzle-orm/pg-core";

const chatRoomsSchema = pgTable(
  "chat_rooms",
  {
    id: varchar("id", { length: 256 }).primaryKey(),
    name: varchar("name", { length: 256 }).unique().notNull(),
    password: varchar("password", { length: 256}),
    isGroup: boolean("is_group").default(false),
    createdBy: varchar("created_by", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("created_by_index").on(table.createdBy),
    index("name_index").on(table.name),
    foreignKey({
      columns: [table.createdBy],
      foreignColumns: [users.id],
    }),
  ]
);

export { chatRoomsSchema };
