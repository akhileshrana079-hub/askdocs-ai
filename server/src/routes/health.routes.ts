import { Router } from "express";
import ApiResponse from "../utils/ApiResponse";

const router = Router();

router.get("/", (_, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, null, "AskDocs API is running 🚀"));
});

export default router;