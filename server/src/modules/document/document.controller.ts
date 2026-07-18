import asyncHandler from "../../utils/asyncHandler";
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";

import { createDocument } from "./document.service";

export const uploadDocument = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No file uploaded");
  }

  const document = await createDocument(req.file, req.user!.id);

  return res.status(201).json(
    new ApiResponse(
      201,
      document,
      "Document uploaded successfully"
    )
  );
});