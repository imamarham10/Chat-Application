import { ulid } from "ulid";
import { db } from "../database/db_config";
import { chatRoomsSchema } from "../database/schemas/chat_room_schema";
import { isNullEmptyOrUndefined } from "../utils/global_utils";

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

export { createChatRoom };
