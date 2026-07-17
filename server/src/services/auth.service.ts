import prisma from "../lib/prisma";
import { toUserResponse } from "../mappers/user.mapper";
import ApiError from "../utils/ApiError";
import { hashPassword } from "../utils/hash";
import { RegisterDto } from "../dto/auth.dto";

export const registerUser = async ({
  name,
  email,
  password,
}: RegisterDto) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new ApiError(409, "Email already registered");
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return toUserResponse(user);
};