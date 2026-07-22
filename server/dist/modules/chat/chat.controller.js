"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.deleteChat = exports.getChat = exports.getChatHistory = exports.askQuestion = void 0;
const chatService = __importStar(require("./chat.service"));
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const ApiResponse_1 = __importDefault(require("../../utils/ApiResponse"));
exports.askQuestion = (0, asyncHandler_1.default)(async (req, res) => {
    const { question, documentId } = req.body;
    const answer = await chatService.askQuestion(question, req.user.id);
    const chat = await chatService.createChat(req.user.id, documentId ?? null, question, answer);
    return res.status(201).json(new ApiResponse_1.default(201, chat, "Question answered successfully"));
});
exports.getChatHistory = (0, asyncHandler_1.default)(async (req, res) => {
    const chats = await chatService.getChatHistory(req.user.id);
    return res.json(new ApiResponse_1.default(200, chats, "Chat history fetched successfully"));
});
exports.getChat = (0, asyncHandler_1.default)(async (req, res) => {
    const chat = await chatService.getChatById(req.params.id, req.user.id);
    return res.json(new ApiResponse_1.default(200, chat, "Chat fetched successfully"));
});
exports.deleteChat = (0, asyncHandler_1.default)(async (req, res) => {
    await chatService.deleteChat(req.params.id, req.user.id);
    return res.json(new ApiResponse_1.default(200, null, "Chat deleted successfully"));
});
exports.search = (0, asyncHandler_1.default)(async (req, res) => {
    const { question } = req.body;
    const answer = await chatService.askQuestion(question, req.user.id);
    return res.json(new ApiResponse_1.default(200, answer, "Relevant chunks found"));
});
