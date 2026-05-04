import { type Request, type Response, type NextFunction } from "express";
import validator from "validator";
import { verifyToken } from "../utils/jwt.ts";
import { prisma } from "../../lib/prisma.ts";

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, auth denied" });
  }
  try {
    req.user = verifyToken(token);

    next();
  } catch (err) {
    res.status(401).json({ message: "token is not valid" });
  }
};

export function validateRegisterUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ message: "invalid values" });
  }
  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ message: "Please provide a valid email address" });
  }
  if (!isValidPassword(req.body.password)) {
    return res.status(400).send({ message: "Password too short" });
  }

  next();
}
function isValidPassword(password: any): boolean {
  return password.length >= 8;
}

export async function checkExisting(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { username, email } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }
    next();
  } catch (error) {
    return res.status(409).json({ message: "Error checking existing users" });
  }
}
export function validateLoginUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Missing username and password" });
  }

  next();
}
