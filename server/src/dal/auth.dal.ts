import { eq } from "drizzle-orm";
import { db } from "../database/db_config";
import { users } from "../database/schemas/user_schema";
import { ulid } from "ulid";

export const findUserByEmail = async (email: string) => {
  const result = await db.select().from(users).where(eq(users.email, email));
  return result[0];
};

export const createUser = async (data: {
  name: string;
  email: string;
  hashedPassword?: string;
  provider?: string;
}) => {
  await db.insert(users).values({
    id: ulid(),
    name: data.name,
    email: data.email,
    password: data.hashedPassword,
    provider: data.provider ?? "credentials",
  });
};
