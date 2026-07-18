import prisma from "../../lib/prisma";

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