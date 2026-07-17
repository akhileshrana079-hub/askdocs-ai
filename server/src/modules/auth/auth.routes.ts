import { Router } from "express";
import { register } from "./auth.controller";
import { registerValidator } from "./auth.validator";
import { login } from "./auth.controller";
import { loginValidator } from "./auth.validator";

const router = Router();

router.post("/register", registerValidator, register);
router.post("/login",loginValidator,login);
export default router;