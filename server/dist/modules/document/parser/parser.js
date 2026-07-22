"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDocument = void 0;
const path_1 = __importDefault(require("path"));
const pdf_parser_1 = require("./pdf.parser");
const docx_parser_1 = require("./docx.parser");
const parseDocument = async (filePath) => {
    const extension = path_1.default.extname(filePath).toLowerCase();
    switch (extension) {
        case ".pdf":
            return (0, pdf_parser_1.parsePdf)(filePath);
        case ".docx":
            return (0, docx_parser_1.parseDocx)(filePath);
        default:
            throw new Error("Unsupported document type");
    }
};
exports.parseDocument = parseDocument;
