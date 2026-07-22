"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitIntoChunks = void 0;
const textsplitters_1 = require("@langchain/textsplitters");
const splitter = new textsplitters_1.RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
});
const splitIntoChunks = async (text) => {
    return splitter.splitText(text);
};
exports.splitIntoChunks = splitIntoChunks;
