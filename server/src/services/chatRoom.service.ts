import { createChatRoom } from "../dal/chatRoom.dal";
import { isNullEmptyOrUndefined } from "../utils/global_utils";

const createChatRoomService = async (
  user: { id: string; name: string; email: string },
  roomName: string,
  isGroup: boolean,
  password?: string
) => {
  try {
    if (
      isNullEmptyOrUndefined(roomName) ||
      isNullEmptyOrUndefined(user) ||
      isNullEmptyOrUndefined(isGroup)
    ) {
      throw new Error(
        `Missing required fields in createChatRoomService : name or user`
      );
    }
    const chatRoom = await createChatRoom({
      user,
      roomName,
      password,
      isGroup,
    });
    return chatRoom;
  } catch (error) {
    console.log(`Error in createChatRoomService: ${error}`);
    throw error;
  }
};

export { createChatRoomService}