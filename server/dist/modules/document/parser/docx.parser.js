"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDocx = void 0;
const fs_1 = __importDefault(require("fs"));
const mammoth_1 = __importDefault(require("mammoth"));
const parseDocx = async (filePath) => {
    const buffer = fs_1.default.readFileSync(filePath);
    const result = await mammoth_1.default.extractRawText({
        buffer,
    });
    return result.value.trim();
};
exports.parseDocx = parseDocx;
