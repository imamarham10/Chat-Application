import express, { Request, Response } from "express";
import { createChatRoomController } from "../controllers/chatRoom.controller";
const chatRoomRouter = express.Router();

chatRoomRouter.post("/create", (req: Request, res: Response)=>{
    createChatRoomController(req,res);
})



export {chatRoomRouter}