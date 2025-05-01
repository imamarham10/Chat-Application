import { Request, Response } from "express";
import { isNullEmptyOrUndefined } from "../utils/global_utils";
import { ResponseUtil } from "../utils/response_utils";
import { logRequest } from "../../logger/requestLogger";
import jwt from "jsonwebtoken";
import config from "../../config";
import { createChatRoomService, joinChatRoomService } from "../services/chatRoom.service";
const { JWT_SECRET } = config;
export const createChatRoomController = async (req: Request, res: Response) => {
  try {
    const { roomName, password, isGroup } = req.body;
    const token = req.cookies.user;
    const decodedToken = jwt.verify(token, JWT_SECRET!);
    const user = decodedToken as { id: string; name: string; email: string };
    if (isNullEmptyOrUndefined(roomName) || isNullEmptyOrUndefined(isGroup)) {
      throw new Error(`Missing required fields in createChatRoomController`);
    }
    const chatRoom = await createChatRoomService(
      user,
      roomName,
      isGroup,
      password
    );
    logRequest({ req: req, data: chatRoom });
    return ResponseUtil.getCreatedResponse(
      res,
      `Chat room created successfully`,
      chatRoom
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : `Internal server error`;
    return ResponseUtil.getInternalServerErrorResponse(res, message, message);
  }
};

export const joinChatRoomController = async (req: Request, res: Response) => {
  try{
    const { roomName, password } = req.body;
    console.log("🚀 ~ joinChatRoomController ~ roomName:", roomName)
    console.log("🚀 ~ joinChatRoomController ~ password:", password)
    
    const token = req.cookies.user;
    const decodedToken = jwt.verify(token, JWT_SECRET!);
    const user = decodedToken as { id: string, name: string, email: string};
    if(isNullEmptyOrUndefined(roomName) || isNullEmptyOrUndefined(password) || isNullEmptyOrUndefined(user)){
      throw new Error(`Missing required fields in joinChatRoomController`);
    }
    await joinChatRoomService(user, roomName, password);
    return ResponseUtil.getOkResponse(res, `Chat room joined successfully`, {status: true})
  }catch(error){
    const message = error instanceof Error ? error.message : `Internal server error`;
    logRequest({ req: req, data: message });
    return ResponseUtil.getInternalServerErrorResponse(res, message, message);
  }
};
