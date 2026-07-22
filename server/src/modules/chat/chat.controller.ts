import * as chatService from "./chat.service";
import asyncHandler from "../../utils/asyncHandler";
import ApiResponse from "../../utils/ApiResponse";

export const askQuestion = asyncHandler(async (req, res) => {
  const { question, documentId } = req.body;

  const answer = await chatService.askQuestion(
    question,
    req.user!.id
  );

  const chat = await chatService.createChat(
    req.user!.id,
    documentId ?? null,
    question,
    answer
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      chat,
      "Question answered successfully"
    )
  );
});

export const getChatHistory = asyncHandler(async (req, res) => {
  const chats = await chatService.getChatHistory(req.user!.id);

  return res.json(
    new ApiResponse(
      200,
      chats,
      "Chat history fetched successfully"
    )
  );
});

export const getChat = asyncHandler(async (req, res) => {
  const chat = await chatService.getChatById(
    req.params.id as string,
    req.user!.id
  );

  return res.json(
    new ApiResponse(
      200,
      chat,
      "Chat fetched successfully"
    )
  );
});

export const deleteChat = asyncHandler(async (req, res) => {
  await chatService.deleteChat(
    req.params.id as string,
    req.user!.id
  );

  return res.json(
    new ApiResponse(
      200,
      null,
      "Chat deleted successfully"
    )
  );
});

export const search = asyncHandler(async (req, res) => {
  const { question } = req.body;

  const answer = await chatService.askQuestion(
    question,
    req.user!.id
  );

  return res.json(
    new ApiResponse(
      200,
      answer,
      "Relevant chunks found"
    )
  );
});