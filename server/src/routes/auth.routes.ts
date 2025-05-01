import express, { Request, Response } from "express";
import { loginController, registerController, verifyUserController } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/auth/register", (req: Request, res: Response) => {
    registerController(req,res);
});

authRouter.get("/auth/verify", (req: Request, res: Response)=> {
    verifyUserController(req,res);
})

authRouter.post("/auth/login", (req: Request, res: Response) => {
    loginController(req,res);
})

export default authRouter;
