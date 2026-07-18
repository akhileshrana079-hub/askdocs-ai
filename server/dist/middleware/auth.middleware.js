"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
exports.authenticate = (0, asyncHandler_1.default)(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError_1.default(401, "Unauthorized");
    }
    const token = authHeader.split(" ")[1];
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await prisma_1.default.user.findUnique({
        where: {
            id: decoded.userId,
        },
    });
    if (!user) {
        throw new ApiError_1.default(401, "Unauthorized");
    }
    req.user = user;
    next();
});
