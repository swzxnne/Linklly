import "dotenv/config";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET not set");
}

export const signToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "3600ms" });
};

export const verifyToken = (token: string): JwtPayload & { userId: number } => {
  const decoded = jwt.verify(token, JWT_SECRET);
  if (typeof decoded === "string" || typeof decoded.userId !== "number") {
    throw new Error("Invalid token payload");
  }
  return decoded as JwtPayload & { userId: number };
};
