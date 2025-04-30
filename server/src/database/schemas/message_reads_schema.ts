import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

const messageReadsSchema = pgTable("message_reads", {
    id: varchar("id", { length: 36 }).primaryKey(),
    messageId: varchar("message_id", { length: 36 }).notNull(),
    userId: varchar("user_id", { length: 36 }).notNull(),
    readAt: timestamp("read_at", { withTimezone: true }).defaultNow(),
  });
  
export {messageReadsSchema}