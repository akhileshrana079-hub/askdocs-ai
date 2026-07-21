import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware";
import { search } from "./chat.controller";

const router = Router();

router.post(
  "/search",
  authenticate,
  search
);

export default router;