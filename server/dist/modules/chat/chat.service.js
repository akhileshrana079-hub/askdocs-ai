"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askQuestion = exports.deleteChat = exports.getChatById = exports.getChatHistory = exports.createChat = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const embedding_service_1 = require("../document/embedding/embedding.service");
const qdrant_service_1 = require("../document/vector/qdrant.service");
const llm_service_1 = require("./llm.service");
const createChat = async (userId, documentId, question, answer) => {
    return prisma_1.default.chat.create({
        data: {
            userId,
            documentId,
            question,
            answer,
        },
    });
};
exports.createChat = createChat;
const getChatHistory = async (userId) => {
    return prisma_1.default.chat.findMany({
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
exports.getChatHistory = getChatHistory;
const getChatById = async (chatId, userId) => {
    const chat = await prisma_1.default.chat.findFirst({
        where: {
            id: chatId,
            userId,
        },
        include: {
            document: true,
        },
    });
    if (!chat) {
        throw new ApiError_1.default(404, "Chat not found");
    }
    return chat;
};
exports.getChatById = getChatById;
const deleteChat = async (chatId, userId) => {
    const chat = await prisma_1.default.chat.findFirst({
        where: {
            id: chatId,
            userId,
        },
    });
    if (!chat) {
        throw new ApiError_1.default(404, "Chat not found");
    }
    await prisma_1.default.chat.delete({
        where: {
            id: chat.id,
        },
    });
    return null;
};
exports.deleteChat = deleteChat;
const askQuestion = async (question, ownerId) => {
    const embedding = await (0, embedding_service_1.createEmbedding)(question);
    const results = await (0, qdrant_service_1.searchEmbeddings)(embedding, ownerId);
    const context = results
        .map((item) => item.payload?.text)
        .join("\n\n");
    const answer = await (0, llm_service_1.generateAnswer)(question, context);
    return answer;
};
exports.askQuestion = askQuestion;
