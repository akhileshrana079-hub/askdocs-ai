"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDocumentResponse = void 0;
const toDocumentResponse = (doc) => ({
    id: doc.id,
    filename: doc.originalName,
    status: doc.status,
    size: doc.size,
    createdAt: doc.createdAt,
});
exports.toDocumentResponse = toDocumentResponse;
