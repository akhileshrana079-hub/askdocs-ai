import { Router } from "express";

import { register, login, me } from "./auth.controller";
import { registerValidator, loginValidator } from "./auth.validator";

import { authenticate } from "../../middleware/auth.middleware";


const router = Router();

router.post("/register", registerValidator, register);
router.post("/login",loginValidator,login);
router.get("/me",authenticate,me);
export default router;