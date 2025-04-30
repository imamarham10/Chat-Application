import { pgTable, varchar, timestamp, primaryKey, index } from "drizzle-orm/pg-core";

const userPresenceSchema = pgTable("user_presence", {
    userId: varchar("user_id", { length: 36 }),
    roomId: varchar("room_id", { length: 36 }).notNull(),
    isOnline: varchar("is_online").default("false"),
    lastSeen: timestamp("last_seen", { withTimezone: true }),    
  },(table)=>[
    primaryKey({columns: [table.userId, table.roomId]}),
    index("user_id_index").on(table.userId),
    index("room_id_index").on(table.roomId),
    index("is_online_index").on(table.isOnline),
    index("last_seen_index").on(table.lastSeen),
  ]);
export {userPresenceSchema}