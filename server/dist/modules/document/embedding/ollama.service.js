"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OllamaEmbeddingService = void 0;
const ollama_1 = __importDefault(require("ollama"));
class OllamaEmbeddingService {
    async createEmbedding(text) {
        const response = await ollama_1.default.embeddings({
            model: "nomic-embed-text",
            prompt: text,
        });
        return response.embedding;
    }
}
exports.OllamaEmbeddingService = OllamaEmbeddingService;
