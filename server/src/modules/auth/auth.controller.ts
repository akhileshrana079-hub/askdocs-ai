import { Request, Response } from "express";
import { validationResult } from "express-validator";

import asyncHandler from "../../utils/asyncHandler";
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";

import {registerUser,loginUser,getProfile,} from "./auth.service";


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



export const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, "Validation failed");
  }

  const data = await loginUser(req.body);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        data,
        "Login successful"
      )
    );
});



export const me = asyncHandler(async (req, res) => {
  const user = await getProfile(req.user!.id);

  return res.json(
    new ApiResponse(
      200,
      user,
      "Profile fetched successfully"
    )
  );
});