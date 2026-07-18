import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware";
import { upload } from "./multer";
import { uploadDocument } from "./document.controller";
import { getDocuments } from "./document.controller";
import { getDocument } from "./document.controller";
import { deleteDocument } from "./document.controller";
const router = Router();

router.post("/upload",authenticate,upload.single("file"),uploadDocument);
router.get("/", authenticate, getDocuments);
router.get("/:id", authenticate, getDocument);
router.delete("/:id", authenticate, deleteDocument);

export default router;