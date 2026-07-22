"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const qdrant_service_1 = require("./modules/document/vector/qdrant.service");
const startServer = async () => {
    await (0, qdrant_service_1.createCollection)();
    app_1.default.listen(env_1.env.PORT, () => {
        console.log(`🚀 Server running on http://localhost:${env_1.env.PORT}`);
    });
};
startServer();
