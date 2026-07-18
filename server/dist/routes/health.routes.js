"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const router = (0, express_1.Router)();
router.get("/", (_, res) => {
    return res
        .status(200)
        .json(new ApiResponse_1.default(200, null, "AskDocs API is running 🚀"));
});
exports.default = router;
