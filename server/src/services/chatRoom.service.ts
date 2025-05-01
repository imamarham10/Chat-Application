import { connectRedis, redisClient } from "../config/redisClient";
import { createChatRoom, findChatRoomByName, findChatRoomParticipantsByRoomIdAndUserId, insertChatRoomParticipant, updateUserPresence } from "../dal/chatRoom.dal";
import { InvalidPasswordError } from "../utils/error_utils";
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

const joinChatRoomService = async(user: { id: string; name: string; email: string }, roomName: string, password?: string) => {
    try{
      if(isNullEmptyOrUndefined(roomName) || isNullEmptyOrUndefined(user) || isNullEmptyOrUndefined(password)){
        throw new Error(`Missing required fields in joinChatRoomService`);
      }
      const chatRoom = await findChatRoomByName(roomName);
      if(isNullEmptyOrUndefined(chatRoom)){
        throw new Error(`Chat room not found`);
      }
      if(chatRoom.password !== password){
        throw new InvalidPasswordError(`Invalid room password`);
      }
      const existingUserOfRoom = await findChatRoomParticipantsByRoomIdAndUserId(chatRoom.id, user.id);
      if(!existingUserOfRoom){
        await insertChatRoomParticipant(chatRoom.id, user.id, chatRoom.createdBy === user.id);
      }
      await updateUserPresence(user.id, chatRoom.id);

      await connectRedis();
      await redisClient.sAdd(`room:${chatRoom.id}:users`, user.id);
      await redisClient.expire(`room:${chatRoom.id}:users`, 60 * 60 * 6); // 6 hours

      // await publishMessageToRoom(chatRoom.id, {
      //   type: 'user-joined',
      //   user: {
      //     id: user.id,
      //     name: user.name,
      //   },
      //   timestamp: new Date().toISOString(),
      // });
    }catch(error){
      console.log(`Error in createChatRoomService: ${error}`);
      throw error;
    }
  }
export { createChatRoomService, joinChatRoomService}