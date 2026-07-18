"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.login = exports.register = void 0;
const express_validator_1 = require("express-validator");
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const ApiResponse_1 = __importDefault(require("../../utils/ApiResponse"));
const auth_service_1 = require("./auth.service");
exports.register = (0, asyncHandler_1.default)(async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new ApiError_1.default(400, "Validation failed");
    }
    const user = await (0, auth_service_1.registerUser)(req.body);
    return res
        .status(201)
        .json(new ApiResponse_1.default(201, user, "User registered successfully"));
});
exports.login = (0, asyncHandler_1.default)(async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new ApiError_1.default(400, "Validation failed");
    }
    const data = await (0, auth_service_1.loginUser)(req.body);
    return res
        .status(200)
        .json(new ApiResponse_1.default(200, data, "Login successful"));
});
exports.me = (0, asyncHandler_1.default)(async (req, res) => {
    const user = await (0, auth_service_1.getProfile)(req.user.id);
    return res.json(new ApiResponse_1.default(200, user, "Profile fetched successfully"));
});
