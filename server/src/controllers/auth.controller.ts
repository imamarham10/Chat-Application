import { Request, Response } from "express";
import { isNullEmptyOrUndefined } from "../utils/global_utils";
import { ResponseUtil } from "../utils/response_utils";
import { loginService, registerService } from "../services/auth.service";
import jwt from "jsonwebtoken";

const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (
      isNullEmptyOrUndefined(name) ||
      isNullEmptyOrUndefined(email) ||
      isNullEmptyOrUndefined(password)
    ) {
      return ResponseUtil.getBadRequestResponse(
        res,
        `Missing required fields`,
        `Missing required fields!`
      );
    }
    await registerService(name, email, password);
    return ResponseUtil.getCreatedResponse(
      res,
      `User registered successfully`,
      `User registered successfully`
    );
  } catch (error: any) {
    const status = error.message === "User already exists" ? 409 : 500;
    return res.status(status).json({ error: error.message });
  }
};

const verifyUserController = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.user;
    if (isNullEmptyOrUndefined(token)) {
      return ResponseUtil.getUnauthorizedResponse(res, `Unauthorized`, {
        authenticated: false,
      });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("🚀 ~ verifyUserController ~ user:", decodedToken)
    return ResponseUtil.getOkResponse(res, `User authenticated`, {
      autheticated: true,
      user: decodedToken,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : `An unknown error occurred`;
    return ResponseUtil.getInternalServerErrorResponse(res, message, message);
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (isNullEmptyOrUndefined(email) || isNullEmptyOrUndefined(password)) {
      return ResponseUtil.getBadRequestResponse(
        res,
        `Missing required fields`,
        `Missing required fields!`
      );
    }
    const { token, user } = await loginService(email, password);

    res.cookie("user", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return ResponseUtil.getOkResponse(res, `User logged in successfully`, 
      {authenticated: true, user: user},
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : `An unknown error occurred`;
    return ResponseUtil.getInternalServerErrorResponse(res, message, message);
  }
};

export { registerController, verifyUserController, loginController };
