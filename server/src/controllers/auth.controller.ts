import { Request, Response } from "express";
import { validationResult } from "express-validator";

import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";

import { registerUser } from "../services/auth.service";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, "Validation failed");
  }

  const user = await registerUser(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});