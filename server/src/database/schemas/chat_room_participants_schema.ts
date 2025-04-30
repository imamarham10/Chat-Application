import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

const chatRoomParticipantsSchema = pgTable("chat_room_participants", {
    id: varchar("id", { length: 36 }).primaryKey(),
    conversationId: varchar("conversation_id", { length: 36 }).notNull(),
    userId: varchar("user_id", { length: 36 }).notNull(),
    joinedAt: timestamp("joined_at", { withTimezone: true }).defaultNow(),
    isAdmin: varchar("is_admin").default("false"),
  });
  
export {chatRoomParticipantsSchema}