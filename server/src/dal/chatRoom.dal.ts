import { ulid } from "ulid";
import { db } from "../database/db_config";
import { chatRoomsSchema } from "../database/schemas/chat_room_schema";
import { isNullEmptyOrUndefined } from "../utils/global_utils";
import { and, eq } from "drizzle-orm";
import { chatRoomParticipantsSchema } from "../database/schemas/chat_room_participants_schema";
import { userPresenceSchema } from "../database/schemas/user_presence_schema";

interface CreateChatRoomParams {
  user: User;
  roomName: string;
  password?: string;
  isGroup: boolean;
}

type User = {
  id: string;
  name: string;
  email: string;
};
const createChatRoom = async (params: CreateChatRoomParams) => {
  try {
    const { user, roomName, password, isGroup } = params;
    if (
      isNullEmptyOrUndefined(user) ||
      isNullEmptyOrUndefined(roomName) ||
      isNullEmptyOrUndefined(isGroup)
    ) {
      throw new Error(
        `Missing required fields in createChatRoom: user or roomName`
      );
    }
    const chatRoom = await db
      .insert(chatRoomsSchema)
      .values({
        id: ulid(),
        name: roomName,
        password: password ?? null,
        createdBy: user.id,
        createdAt: new Date(),
        isGroup,
      })
      .returning({
        id: chatRoomsSchema.id,
        name: chatRoomsSchema.name,
        password: chatRoomsSchema.password,
        createdBy: chatRoomsSchema.createdBy,
        createdAt: chatRoomsSchema.createdAt,
        isGroup: chatRoomsSchema.isGroup,
      });

    return chatRoom[0];
  } catch (error) {
    console.log(`Error in createChatRoom: ${error}`);
    throw error;
  }
};

const findChatRoomByName = async (roomName: string) => {
  try {
    if (isNullEmptyOrUndefined(roomName)) {
      throw new Error(`Missing required fields in findChatRoomByName`);
    }
    const chatRoom = await db
      .select()
      .from(chatRoomsSchema)
      .where(eq(chatRoomsSchema.name, roomName));
    if (chatRoom.length === 0) {
      throw new Error(`Chat room not found`);
    }
    return chatRoom[0];
  } catch (error) {
    console.log(`Error in findChatRoomByName: ${error}`);
    throw error;
  }
};

const findChatRoomParticipantsByRoomIdAndUserId = async (
  roomId: string,
  userId: string
) => {
  try {
    if (isNullEmptyOrUndefined(roomId) || isNullEmptyOrUndefined(userId)) {
      throw new Error(
        `Missing required fields in findChatRoomParticipantsByRoomIdAndUserId`
      );
    }
    const chatRoomParticipant = await db
      .select()
      .from(chatRoomParticipantsSchema)
      .where(
        and(
          eq(chatRoomParticipantsSchema.conversationId, roomId),
          eq(chatRoomParticipantsSchema.userId, userId)
        )
      );
    return chatRoomParticipant;
  } catch (error) {
    console.log(
      "🚀 ~ findChatRoomParticipantsByRoomIdAndUserId ~ error:",
      error
    );
    throw error;
  }
};
const insertChatRoomParticipant = async (
  roomId: string,
  userId: string,
  isAdmin?: boolean
) => {
  try {
    if (isNullEmptyOrUndefined(roomId) || isNullEmptyOrUndefined(userId)) {
      throw new Error(`Missing required fields in insertChatRoomParticipant`);
    }
    const chatRoomParticipant = await db
      .insert(chatRoomParticipantsSchema)
      .values({
        id: ulid(),
        userId: userId,
        conversationId: roomId,
        joinedAt: new Date(),
        isAdmin: isAdmin ?? false,
      })
      .returning({
        id: chatRoomParticipantsSchema.id,
        joinedAt: chatRoomParticipantsSchema.joinedAt,
        userId: chatRoomParticipantsSchema.userId,
        conversationId: chatRoomParticipantsSchema.conversationId,
      });
    return chatRoomParticipant[0];
  } catch (error) {
    console.log("🚀 ~ insertChatRoomParticipant ~ error:", error);
    throw error;
  }
};

const updateUserPresence = async (userId: string, roomId: string) => {
  try {
    if (isNullEmptyOrUndefined(userId) || isNullEmptyOrUndefined(roomId)) {
      throw new Error(`Missing required fields in updateUserPresence`);
    }
    const chatRoomParticipant = await db
      .insert(userPresenceSchema)
      .values({
        userId: userId,
        roomId: roomId,
        isOnline: "true",
        lastSeen: new Date(),
      })
      .onConflictDoUpdate({
        target: [userPresenceSchema.userId, userPresenceSchema.roomId],
        set: {
          isOnline: "true",
          lastSeen: new Date(),
        },
      });
    return chatRoomParticipant;
  } catch (error) {
    console.log("🚀 ~ updateUserPresence ~ error:", error);
    throw error;
  }
};

const markUserOnline = async (roomId: string, userId: string) => {
 try{
  await db
  .insert(userPresenceSchema)
  .values({ userId, roomId, isOnline: 'true', lastSeen: new Date() })
  .onConflictDoUpdate({
    target: [userPresenceSchema.userId, userPresenceSchema.roomId],
    set: { isOnline: 'true', lastSeen: new Date() },
  });
 }catch(error){
  console.log("🚀 ~ markUserOnline ~ error:", error);
  throw error;  
 }
};

const markUserOffline = async (roomId: string, userId: string) => {
  try{
    await db
    .update(userPresenceSchema)
    .set({ isOnline: 'false', lastSeen: new Date() })
    .where(and(eq(userPresenceSchema.userId, userId), eq(userPresenceSchema.roomId, roomId)));
  }catch(error){
    console.log("🚀 ~ markUserOffline ~ error:", error)
    throw error;
  }
};

export {
  createChatRoom,
  findChatRoomByName,
  findChatRoomParticipantsByRoomIdAndUserId,
  insertChatRoomParticipant,
  updateUserPresence,
  markUserOnline,
  markUserOffline
};
