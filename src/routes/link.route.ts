import { Router } from "express";
import {
  createLink,
  getUserLinks,
  updateLink,
  deleteLink,
  incrementClick,
} from "../controllers/link.controller.ts";
import { authMiddleware } from "../middlewares/validate.middleware.ts";

const router = Router();

router.post("/links", authMiddleware, createLink);
router.get("/links", authMiddleware, getUserLinks);
router.patch("/links/:id", authMiddleware, updateLink);
router.delete("/links/:id", authMiddleware, deleteLink);
router.post("/links/:id/click", incrementClick);

export default router;
