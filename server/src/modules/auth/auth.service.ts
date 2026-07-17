import prisma from "../../lib/prisma";
import { toUserResponse } from "./user.mapper";
import ApiError from "../../utils/ApiError";
import { hashPassword } from "../../utils/hash";
import { RegisterDto } from "./auth.dto";

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


import { LoginDto } from "./auth.dto";
import { comparePassword } from "../../utils/hash";
import { generateAccessToken } from "../../utils/jwt";


export const loginUser = async ({
  email,
  password,
}: LoginDto) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordCorrect = await comparePassword(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = generateAccessToken(user.id);

  return {
    user: toUserResponse(user),
    accessToken,
  };
};