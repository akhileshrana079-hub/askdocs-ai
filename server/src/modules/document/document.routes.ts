import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware";
import { upload } from "./multer";
import { uploadDocument } from "./document.controller";

const router = Router();

router.post(
  "/upload",
  authenticate,
  upload.single("file"),
  uploadDocument
);

export default router;