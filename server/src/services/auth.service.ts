import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../dal/auth.dal";
import { isNullEmptyOrUndefined } from "../utils/global_utils";
import { InvalidPasswordError } from "../utils/error_utils";
import jwt from 'jsonwebtoken';
import config from "../../config";
const {JWT_SECRET} = config;

export const registerService = async (
  name: string,
  email: string,
  password: string
) => {
  const existing = await findUserByEmail(email);
  if (!isNullEmptyOrUndefined(existing)) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser({ name, email, hashedPassword });
};

export const loginService = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (isNullEmptyOrUndefined(user)) {
    throw new Error(`User not found`);
  }
  if (!isNullEmptyOrUndefined(user.password)) {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(isPasswordValid === false){
      throw new InvalidPasswordError(`Invalid password`);
    }
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email
    }
    const token = jwt.sign(payload, JWT_SECRET! , {
      expiresIn: "1Day",
    })
    return {token,user};
  }else{
    throw new Error(`User password is not set!`);
  }
};
