"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocument = exports.getDocumentById = exports.getDocuments = exports.createDocument = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const document_mapper_1 = require("./document.mapper");
const createDocument = async (file, ownerId) => {
    return prisma_1.default.document.create({
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
exports.createDocument = createDocument;
const getDocuments = async (userId) => {
    const documents = await prisma_1.default.document.findMany({
        where: {
            ownerId: userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return documents.map(document_mapper_1.toDocumentResponse);
};
exports.getDocuments = getDocuments;
const getDocumentById = async (documentId, userId) => {
    const document = await prisma_1.default.document.findFirst({
        where: {
            id: documentId,
            ownerId: userId,
        },
    });
    if (!document) {
        throw new ApiError_1.default(404, "Document not found");
    }
    return (0, document_mapper_1.toDocumentResponse)(document);
};
exports.getDocumentById = getDocumentById;
const deleteDocument = async (documentId, userId) => {
    const document = await prisma_1.default.document.findFirst({
        where: {
            id: documentId,
            ownerId: userId,
        },
    });
    if (!document) {
        throw new ApiError_1.default(404, "Document not found");
    }
    const filePath = path_1.default.resolve(document.path);
    if (fs_1.default.existsSync(filePath)) {
        fs_1.default.unlinkSync(filePath);
    }
    await prisma_1.default.document.delete({
        where: {
            id: document.id,
        },
    });
    return null;
};
exports.deleteDocument = deleteDocument;
