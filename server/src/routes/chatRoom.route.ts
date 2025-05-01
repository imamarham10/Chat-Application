import express, { Request, Response } from "express";
import { createChatRoomController, joinChatRoomController } from "../controllers/chatRoom.controller";
const chatRoomRouter = express.Router();

chatRoomRouter.post("/create", (req: Request, res: Response)=>{
    createChatRoomController(req,res);
});

chatRoomRouter.post("/join", (req: Request, res: Response)=>{
    joinChatRoomController(req,res);
});

export {chatRoomRouter}