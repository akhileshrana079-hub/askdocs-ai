"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.loginUser = exports.registerUser = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const user_mapper_1 = require("./user.mapper");
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const hash_1 = require("../../utils/hash");
const registerUser = async ({ name, email, password, }) => {
    const existingUser = await prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (existingUser) {
        throw new ApiError_1.default(409, "Email already registered");
    }
    const hashedPassword = await (0, hash_1.hashPassword)(password);
    const user = await prisma_1.default.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    return (0, user_mapper_1.toUserResponse)(user);
};
exports.registerUser = registerUser;
const hash_2 = require("../../utils/hash");
const jwt_1 = require("../../utils/jwt");
const loginUser = async ({ email, password, }) => {
    const user = await prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw new ApiError_1.default(401, "Invalid email or password");
    }
    const isPasswordCorrect = await (0, hash_2.comparePassword)(password, user.password);
    if (!isPasswordCorrect) {
        throw new ApiError_1.default(401, "Invalid email or password");
    }
    const accessToken = (0, jwt_1.generateAccessToken)(user.id);
    return {
        user: (0, user_mapper_1.toUserResponse)(user),
        accessToken,
    };
};
exports.loginUser = loginUser;
const getProfile = async (userId) => {
    const user = await prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new ApiError_1.default(404, "User not found");
    }
    return (0, user_mapper_1.toUserResponse)(user);
};
exports.getProfile = getProfile;
