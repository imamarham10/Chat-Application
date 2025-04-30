import { pgTable, varchar, timestamp, text } from "drizzle-orm/pg-core";

const messagesSchema = pgTable("messages", {
    id: varchar("id", { length: 36 }).primaryKey(),
    conversationId: varchar("conversation_id", { length: 36 }).notNull(),
    senderId: varchar("sender_id", { length: 36 }).notNull(),
    content: text("content"),
    mediaUrl: text("media_url"),
    messageType: varchar("message_type").default("text"), // 'text', 'image', etc.
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    editedAt: timestamp("edited_at", { withTimezone: true }),
    deleted: varchar("deleted").default("false"), // ideally boolean
  });
  
export { messagesSchema };