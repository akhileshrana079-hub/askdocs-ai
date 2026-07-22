import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware";
import { search } from "./chat.controller";

import {askQuestion,getChatHistory,getChat,deleteChat} from "./chat.controller";

const router = Router();

router.post("/search",authenticate,search);
router.post("/", authenticate, askQuestion);
router.get("/history", authenticate, getChatHistory);
router.get("/:id", authenticate, getChat);
router.delete("/:id", authenticate, deleteChat);

export default router;