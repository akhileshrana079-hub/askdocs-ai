import { Document } from "@prisma/client";

export const toDocumentResponse = (doc: Document) => ({
  id: doc.id,
  filename: doc.originalName,
  status: doc.status,
  size: doc.size,
  createdAt: doc.createdAt,
});