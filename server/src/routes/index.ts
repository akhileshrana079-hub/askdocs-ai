import { Router } from "express";
import healthRoutes from "./health.routes";
import authRoutes from "../modules/auth/auth.routes";
import documentRoutes from "../modules/document/document.routes";
import chatRoutes from "../modules/chat/chat.routes"

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/documents", documentRoutes);
router.use("/chat", chatRoutes);


export default router;