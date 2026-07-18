import prisma from "../../lib/prisma";
import fs from "fs";
import path from "path";
import ApiError from "../../utils/ApiError";
import { toDocumentResponse } from "./document.mapper";

export const createDocument = async (
  file: Express.Multer.File,
  ownerId: string
) => {
  return prisma.document.create({
    data: {
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      path: file.path,
      ownerId,
    },
  });
};

export const getDocuments = async (userId: string) => {
    const documents = await prisma.document.findMany({
        where: {
            ownerId: userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return documents.map(toDocumentResponse);
};


export const getDocumentById = async (
  documentId: string,
  userId: string
) => {
  const document = await prisma.document.findFirst({
    where: {
      id: documentId,
      ownerId: userId,
    },
  });

  if (!document) {
    throw new ApiError(404, "Document not found");
  }

  return toDocumentResponse(document);
};


export const deleteDocument = async (
  documentId: string,
  userId: string
) => {
  const document = await prisma.document.findFirst({
    where: {
      id: documentId,
      ownerId: userId,
    },
  });

  if (!document) {
    throw new ApiError(404, "Document not found");
  }

  const filePath = path.resolve(document.path);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  await prisma.document.delete({
    where: {
      id: document.id,
    },
  });

  return null;
};