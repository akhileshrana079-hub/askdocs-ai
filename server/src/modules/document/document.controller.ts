import asyncHandler from "../../utils/asyncHandler";
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";

import { createDocument } from "./document.service";
import * as documentService from "./document.service";


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

export const getDocuments = asyncHandler(async (req, res) => {
  const documents = await documentService.getDocuments(req.user!.id);

  return res.json(
    new ApiResponse(
      200,
      documents,
      "Documents fetched successfully"
    )
  );
});


export const getDocument = asyncHandler(async (req, res) => {
  const document = await documentService.getDocumentById(
    req.params.id as string,
    req.user!.id
  );

  return res.json(
    new ApiResponse(
      200,
      document,
      "Document fetched successfully"
    )
  );
});


export const deleteDocument = asyncHandler(async (req, res) => {
  await documentService.deleteDocument(
    req.params.id as string,
    req.user!.id
  );

  return res.json(
    new ApiResponse(
      200,
      null,
      "Document deleted successfully"
    )
  );
});