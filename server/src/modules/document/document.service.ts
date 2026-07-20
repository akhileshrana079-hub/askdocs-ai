import prisma from "../../lib/prisma";
import fs from "fs";
import path from "path";
import ApiError from "../../utils/ApiError";
import { toDocumentResponse } from "./document.mapper";
import { parseDocument } from "./parser/parser";
import { splitIntoChunks } from "./chunk/chunk.service";
import { createEmbedding } from "./embedding/embedding.service";

export const createDocument = async (
  file: Express.Multer.File,
  ownerId: string
) => {
  const document = await prisma.document.create({
    data: {
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      path: file.path,
      ownerId,
    },
  });

  const extractedText = await parseDocument(document.path);

  const chunks = await splitIntoChunks(extractedText);

  console.log("Number of chunks:", chunks.length);

  chunks.forEach((chunk, index) => {
    console.log(`\n===== CHUNK ${index + 1} =====`);
    console.log(chunk);
});

  const embedding = await createEmbedding(chunks[0]);
  console.log("Embedding length:", embedding.length);
  console.log(embedding.slice(0, 10));

  console.log("\n========== EXTRACTED TEXT ==========\n");
  console.log(extractedText);
  console.log("\n====================================\n");

  return document;
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


