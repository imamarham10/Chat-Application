import { pgTable, varchar, timestamp, foreignKey, index } from "drizzle-orm/pg-core";
import { users } from "./user_schema";

const chatRoomsSchema = pgTable(
  "chat_rooms",
  {
    id: varchar("id", { length: 256 }).primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    isGroup: varchar("is_group").default("false"),
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
