import jwt from "jsonwebtoken";

const ACCESS_TOKEN_EXPIRY = "40m";

export const generateAccessToken = (userId: string) => {
  return jwt.sign(
    { userId },
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }
  );
};