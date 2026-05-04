import { Router } from "express";
import {
  deleteUser,
  editProfile,
  fetchUserProfile,
  resetPassword,
} from "../controllers/user.controller.ts";
import { authMiddleware } from "../middlewares/validate.middleware.ts";

const router = Router();

router.patch("/profile", authMiddleware, editProfile);

router.get("/profile/:username", fetchUserProfile);

router.patch("/reset", authMiddleware, resetPassword);

router.delete("/delete", authMiddleware, deleteUser);

export default router;
