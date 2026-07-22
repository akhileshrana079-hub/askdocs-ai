import prisma from "../../lib/prisma";
import ApiError from "../../utils/ApiError";
import { createEmbedding } from "../document/embedding/embedding.service";
import { searchEmbeddings } from "../document/vector/qdrant.service";
import { generateAnswer } from "./llm.service";

export const createChat = async (
  userId: string,
  documentId: string | null,
  question: string,
  answer: string
) => {
  return prisma.chat.create({
    data: {
      userId,
      documentId,
      question,
      answer,
    },
  });
};

export const getChatHistory = async (userId: string) => {
  return prisma.chat.findMany({
    where: {
      userId,
    },
    include: {
      document: {
        select: {
          id: true,
          originalName: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getChatById = async (
  chatId: string,
  userId: string
) => {
  const chat = await prisma.chat.findFirst({
    where: {
      id: chatId,
      userId,
    },
    include: {
      document: true,
    },
  });

  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  return chat;
};

export const deleteChat = async (
  chatId: string,
  userId: string
) => {
  const chat = await prisma.chat.findFirst({
    where: {
      id: chatId,
      userId,
    },
  });

  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  await prisma.chat.delete({
    where: {
      id: chat.id,
    },
  });

  return null;
};

export const askQuestion = async (
  question: string,
  ownerId: string
) => {
  const embedding = await createEmbedding(question);

  const results = await searchEmbeddings(
    embedding,
    ownerId
  );

  const context = results
    .map((item) => item.payload?.text)
    .join("\n\n");

  const answer = await generateAnswer(
    question,
    context
  );

  return answer;
};