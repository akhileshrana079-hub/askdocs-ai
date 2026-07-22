"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchEmbeddings = exports.storeEmbedding = exports.createCollection = void 0;
const qdrant_1 = __importDefault(require("../../../config/qdrant"));
const createCollection = async () => {
    try {
        await qdrant_1.default.getCollection("documents");
        console.log("Collection already exists");
    }
    catch {
        await qdrant_1.default.createCollection("documents", {
            vectors: {
                size: 768,
                distance: "Cosine",
            },
        });
        console.log("Collection created");
    }
};
exports.createCollection = createCollection;
const storeEmbedding = async (id, embedding, payload) => {
    await qdrant_1.default.upsert("documents", {
        wait: true,
        points: [
            {
                id,
                vector: embedding,
                payload,
            },
        ],
    });
};
exports.storeEmbedding = storeEmbedding;
const searchEmbeddings = async (embedding, ownerId, limit = 5) => {
    const result = await qdrant_1.default.search("documents", {
        vector: embedding,
        limit,
        filter: {
            must: [
                {
                    key: "ownerId",
                    match: {
                        value: ownerId,
                    },
                },
            ],
        },
        with_payload: true,
    });
    return result;
};
exports.searchEmbeddings = searchEmbeddings;
