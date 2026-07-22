"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmbedding = void 0;
const ollama_service_1 = require("./ollama.service");
const provider = new ollama_service_1.OllamaEmbeddingService();
const createEmbedding = async (text) => {
    return provider.createEmbedding(text);
};
exports.createEmbedding = createEmbedding;
