"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAnswer = void 0;
const ollama_1 = __importDefault(require("ollama"));
const generateAnswer = async (question, context) => {
    const prompt = `
You are an AI assistant.

Answer ONLY using the context below.

If the answer is not present, say:
"I couldn't find that information in the uploaded document."

Context:
${context}

Question:
${question}

Answer:
`;
    const response = await ollama_1.default.chat({
        model: "llama3.2:3b",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
    });
    return response.message.content;
};
exports.generateAnswer = generateAnswer;
