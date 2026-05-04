import { Router } from "express";
import { loginUser, registerNewUser } from "../controllers/auth.controller.ts";
import {
  validateRegisterUser,
  checkExisting,
  validateLoginUser,
} from "../middlewares/validate.middleware.ts";

const router = Router();

router.post("/register", validateRegisterUser, checkExisting, registerNewUser);

router.post("/login", validateLoginUser, loginUser);

export default router;
