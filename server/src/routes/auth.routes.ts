import { Router } from "express";
import { register } from "../controllers/auth.controller";
import { registerValidator } from "../validators/auth.validator";

const router = Router();

router.post("/register", registerValidator, register);

export default router;